"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { 
  Check, X, Clock, Users, Save, ChevronLeft, ChevronRight,
  Grid3x3, List, Info, AlertCircle
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

type AttendanceStatus = "unmarked" | "present" | "absent" | "late"

interface Student {
  id: string
  name: string
  rollNumber: string
  avatar: string
  class: string
  status: AttendanceStatus
}

interface ClassSchedule {
  id: string
  name: string
  subject: string
  days: string[] // ['Monday', 'Wednesday', 'Friday']
  times: { start: string, end: string }[] // [{ start: '08:00', end: '09:00' }]
}

const allStudents: Student[] = [
  // Class 10-A students
  { id: "1", name: "Emma Johnson", rollNumber: "2024001", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", class: "Class 10-A", status: "unmarked" },
  { id: "2", name: "Liam Smith", rollNumber: "2024002", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam", class: "Class 10-A", status: "unmarked" },
  { id: "3", name: "Olivia Brown", rollNumber: "2024003", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia", class: "Class 10-A", status: "unmarked" },
  // Class 9-B students
  { id: "4", name: "Noah Davis", rollNumber: "2024015", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah", class: "Class 9-B", status: "unmarked" },
  { id: "5", name: "Ava Wilson", rollNumber: "2024016", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava", class: "Class 9-B", status: "unmarked" },
  { id: "6", name: "Lucas Martinez", rollNumber: "2024017", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas", class: "Class 9-B", status: "unmarked" },
  // Class 11-C students
  { id: "7", name: "Sophia Garcia", rollNumber: "2024031", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia", class: "Class 11-C", status: "unmarked" },
  { id: "8", name: "Ethan Martinez", rollNumber: "2024030", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan", class: "Class 11-C", status: "unmarked" },
  { id: "9", name: "Isabella Lopez", rollNumber: "2024032", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella", class: "Class 11-C", status: "unmarked" },
]

const classSchedules: ClassSchedule[] = [
  { id: "1", name: "Class 10-A", subject: "Mathematics", days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'], times: [{ start: '08:00', end: '09:00' }] },
  { id: "2", name: "Class 9-B", subject: "Physics", days: ['Monday', 'Wednesday', 'Thursday', 'Friday'], times: [{ start: '09:00', end: '10:00' }] },
  { id: "3", name: "Class 11-C", subject: "Chemistry", days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], times: [{ start: '10:00', end: '11:00' }] },
]

export default function TeacherAttendance() {
  useEffect(() => {
      document.title = "Attendance"
    }, [])
  const { toast } = useToast()
  const [selectedClass, setSelectedClass] = useState(classSchedules[0].id)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [students, setStudents] = useState<Student[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [showTutorial, setShowTutorial] = useState(false)

  // Filter students by selected class
  useEffect(() => {
    const classData = classSchedules.find(c => c.id === selectedClass)
    if (classData) {
      const filteredStudents = allStudents.filter(s => s.class === classData.name)
      setStudents(filteredStudents)
    }
  }, [selectedClass])

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("attendance-tutorial-seen")
    if (!hasSeenTutorial) {
      setShowTutorial(true)
    }
  }, [])

  // Check if attendance can be marked for selected date
  const canMarkAttendance = () => {
    const today = new Date()
    const selected = new Date(selectedDate)
    
    // Reset time parts for comparison
    today.setHours(0, 0, 0, 0)
    selected.setHours(0, 0, 0, 0)
    
    // Can't mark future dates
    if (selected > today) return { allowed: false, reason: "Cannot mark attendance for future dates" }
    
    // Can only mark today if class is currently in session or already happened today
    if (selected.getTime() === today.getTime()) {
      const classData = classSchedules.find(c => c.id === selectedClass)
      if (!classData) return { allowed: false, reason: "Class not found" }
      
      const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
      if (!classData.days.includes(dayName)) {
        return { allowed: false, reason: `No ${classData.name} class on ${dayName}` }
      }
      
      // Check if class time has started
      const now = new Date()
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      
      const hasClassStarted = classData.times.some(time => currentTime >= time.start)
      if (!hasClassStarted) {
        return { allowed: false, reason: "Class hasn't started yet. Attendance can only be marked during or after class time." }
      }
      
      return { allowed: true, reason: "" }
    }
    
    // For past dates, allow viewing only
    return { allowed: false, reason: "Viewing past attendance. Changes cannot be made." }
  }

  const attendanceCheck = canMarkAttendance()

  const handleTutorialClose = () => {
    localStorage.setItem("attendance-tutorial-seen", "true")
    setShowTutorial(false)
  }

  const cycleStatus = (studentId: string) => {
    if (!attendanceCheck.allowed) {
      toast({
        title: "Cannot mark attendance",
        description: attendanceCheck.reason,
        variant: "destructive"
      })
      return
    }
    
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const statusCycle: AttendanceStatus[] = ["unmarked", "present", "absent", "late"]
        const currentIndex = statusCycle.indexOf(student.status)
        const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length]
        return { ...student, status: nextStatus }
      }
      return student
    }))
  }

  const markAllPresent = () => {
    if (!attendanceCheck.allowed) {
      toast({
        title: "Cannot mark attendance",
        description: attendanceCheck.reason,
        variant: "destructive"
      })
      return
    }
    
    setStudents(prev => prev.map(s => ({ ...s, status: "present" })))
    toast({
      title: "All students marked present",
      description: "Successfully marked all students as present",
    })
  }

  const resetAll = () => {
    if (!attendanceCheck.allowed) {
      toast({
        title: "Cannot modify attendance",
        description: attendanceCheck.reason,
        variant: "destructive"
      })
      return
    }
    
    setStudents(prev => prev.map(s => ({ ...s, status: "unmarked" })))
    toast({
      title: "Attendance reset",
      description: "All attendance records have been reset",
    })
  }

  const saveAttendance = () => {
    if (!attendanceCheck.allowed) {
      toast({
        title: "Cannot save attendance",
        description: attendanceCheck.reason,
        variant: "destructive"
      })
      return
    }
    
    const markedCount = students.filter(s => s.status !== "unmarked").length
    if (markedCount === 0) {
      toast({
        title: "No attendance marked",
        description: "Please mark attendance before saving",
        variant: "destructive"
      })
      return
    }
    
    toast({
      title: "Attendance saved",
      description: `Successfully saved attendance for ${markedCount} student(s)`,
    })
  }

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return "border-success bg-success/10 hover:bg-success/20"
      case "absent": return "border-destructive bg-destructive/10 hover:bg-destructive/20"
      case "late": return "border-warning bg-warning/10 hover:bg-warning/20"
      default: return "border-border bg-background hover:bg-muted/50"
    }
  }

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return <Check className="w-8 h-8 text-success" />
      case "absent": return <X className="w-8 h-8 text-destructive" />
      case "late": return <Clock className="w-8 h-8 text-warning" />
      default: return <Users className="w-8 h-8 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return <Badge className="bg-success">Present</Badge>
      case "absent": return <Badge className="bg-destructive">Absent</Badge>
      case "late": return <Badge className="bg-warning">Late</Badge>
      default: return <Badge variant="outline">Unmarked</Badge>
    }
  }

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    
    // Don't allow future dates
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    newDate.setHours(0, 0, 0, 0)
    
    if (newDate <= today) {
      setSelectedDate(newDate)
    }
  }

  const stats = {
    present: students.filter(s => s.status === "present").length,
    absent: students.filter(s => s.status === "absent").length,
    late: students.filter(s => s.status === "late").length,
    unmarked: students.filter(s => s.status === "unmarked").length,
  }

  const isToday = new Date(selectedDate).toDateString() === new Date().toDateString()
  const isFutureDate = new Date(selectedDate) > new Date()

  return (
    <TeacherLayout title="Attendance" showBackButton>
      <div className="space-y-6">
        {/* Tutorial Dialog */}
        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Attendance System Tutorial</DialogTitle>
              <DialogDescription>
                Learn how to quickly mark attendance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <p className="font-medium text-foreground">Select Class & Date</p>
                  <p className="text-sm text-muted-foreground">Choose the class and date for attendance marking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <p className="font-medium text-foreground">Click to Mark</p>
                  <p className="text-sm text-muted-foreground">Click once: Present • Click twice: Absent • Click three times: Late • Click four times: Reset</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <p className="font-medium text-foreground">Save Attendance</p>
                  <p className="text-sm text-muted-foreground">Click "Save Attendance" when finished</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-info/10 border border-info">
                <p className="text-sm text-info font-medium">Note: You can only mark attendance for today's classes that have started, or view past attendance records.</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleTutorialClose}>Got it!</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Warning Banner */}
        {!attendanceCheck.allowed && (
          <Card className="border-warning bg-warning/5 animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                <div>
                  <p className="font-semibold text-warning">Attendance Marking Disabled</p>
                  <p className="text-sm text-muted-foreground">{attendanceCheck.reason}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {classSchedules.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name} - {cls.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Date</label>
                <div className="flex items-center gap-2">
                  <Button className="w-full sm:w-auto" 
                    variant="outline" 
                    size="icon"
                    onClick={() => changeDate(-1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => changeDate(1)}
                    disabled={isFutureDate || isToday}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">View Mode</label>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button 
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                    className="flex-1"
                  >
                    <List className="w-4 h-4 mr-2" />
                    List
                  </Button>
                  <Button 
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                    className="flex-1"
                  >
                    <Grid3x3 className="w-4 h-4 mr-2" />
                    Grid
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={markAllPresent} variant="outline" disabled={!attendanceCheck.allowed}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Present
              </Button>
              <Button onClick={resetAll} variant="outline" disabled={!attendanceCheck.allowed}>
                Reset All
              </Button>
              <Button onClick={saveAttendance} variant="default" disabled={!attendanceCheck.allowed}>
                <Save className="w-4 h-4 mr-2" />
                Save Attendance
              </Button>
              <Button onClick={() => setShowTutorial(true)} variant="ghost">
                <Info className="w-4 h-4 mr-2" />
                Tutorial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-3xl font-bold text-foreground">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <Check className="w-8 h-8 mx-auto text-success mb-2" />
                <p className="text-3xl font-bold text-success">{stats.present}</p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <X className="w-8 h-8 mx-auto text-destructive mb-2" />
                <p className="text-3xl font-bold text-destructive">{stats.absent}</p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto text-warning mb-2" />
                <p className="text-3xl font-bold text-warning">{stats.late}</p>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-3xl font-bold text-muted-foreground">{stats.unmarked}</p>
                <p className="text-sm text-muted-foreground">Unmarked</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student List/Grid */}
        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Students ({students.length})</CardTitle>
              <Badge variant="outline">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "list" ? (
              <div className="space-y-3">
                {students.map((student, index) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer animate-slide-up ${getStatusColor(student.status)}`}
                    style={{ animationDelay: `${350 + index * 30}ms` }}
                    onClick={() => cycleStatus(student.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(student.status)}
                      {getStatusBadge(student.status)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {students.map((student, index) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer animate-scale-in ${getStatusColor(student.status)}`}
                    style={{ animationDelay: `${350 + index * 30}ms` }}
                    onClick={() => cycleStatus(student.id)}
                  >
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <p className="font-semibold text-foreground mb-1">{student.name}</p>
                      <p className="text-xs text-muted-foreground mb-3">Roll: {student.rollNumber}</p>
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(student.status)}
                      </div>
                      <div className="mt-2">
                        {getStatusBadge(student.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  )
}
