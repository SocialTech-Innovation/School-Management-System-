"use client"

import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, Clock, MapPin, BookOpen, Download, AlertCircle
} from "lucide-react"
import { useState } from "react"

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
]

// Regular weekly timetable (fixed schedule)
const regularTimetable = {
  Monday: [
    { time: "08:00 - 09:00", class: "Class 10-A", subject: "Mathematics", room: "Room 201", color: "bg-blue-500" },
    { time: "10:00 - 11:00", class: "Class 11-C", subject: "Chemistry", room: "Room 308", color: "bg-green-500" },
    { time: "02:00 - 03:00", class: "Class 9-B", subject: "Physics", room: "Room 305", color: "bg-purple-500" },
  ],
  Tuesday: [
    { time: "09:00 - 10:00", class: "Class 10-B", subject: "Mathematics", room: "Room 201", color: "bg-blue-500" },
    { time: "11:00 - 12:00", class: "Class 10-A", subject: "Mathematics", room: "Room 201", color: "bg-blue-500" },
    { time: "01:00 - 02:00", class: "Class 11-C", subject: "Chemistry", room: "Room 308", color: "bg-green-500" },
  ],
  Wednesday: [
    { time: "08:00 - 09:00", class: "Class 9-B", subject: "Physics", room: "Room 305", color: "bg-purple-500" },
    { time: "10:00 - 11:00", class: "Class 10-A", subject: "Mathematics", room: "Room 201", color: "bg-blue-500" },
    { time: "02:00 - 03:00", class: "Class 11-C", subject: "Chemistry Lab", room: "Lab 2", color: "bg-green-500" },
  ],
  Thursday: [
    { time: "09:00 - 10:00", class: "Class 11-C", subject: "Chemistry", room: "Room 308", color: "bg-green-500" },
    { time: "11:00 - 12:00", class: "Class 9-B", subject: "Physics", room: "Room 305", color: "bg-purple-500" },
    { time: "01:00 - 02:00", class: "Class 10-B", subject: "Mathematics", room: "Room 201", color: "bg-blue-500" },
  ],
  Friday: [
    { time: "08:00 - 09:00", class: "Class 10-A", subject: "Mathematics", room: "Room 201", color: "bg-blue-500" },
    { time: "09:00 - 10:00", class: "Class 9-B", subject: "Physics Lab", room: "Lab 1", color: "bg-purple-500" },
    { time: "11:00 - 12:00", class: "Class 11-C", subject: "Chemistry", room: "Room 308", color: "bg-green-500" },
  ],
}

// Exam period schedule (March 15-25, 2024)
const examTimetable = {
  Monday: [
    { time: "09:00 - 11:00", class: "Class 10-A", subject: "Mathematics Exam", room: "Hall A", color: "bg-red-500", isExam: true },
    { time: "02:00 - 04:00", class: "Class 11-C", subject: "Chemistry Exam", room: "Hall B", color: "bg-red-500", isExam: true },
  ],
  Tuesday: [
    { time: "09:00 - 11:00", class: "Class 9-B", subject: "Physics Exam", room: "Hall A", color: "bg-red-500", isExam: true },
    { time: "02:00 - 04:00", class: "Class 10-B", subject: "Mathematics Exam", room: "Hall B", color: "bg-red-500", isExam: true },
  ],
  Wednesday: [
    { time: "09:00 - 11:00", class: "Class 11-C", subject: "Chemistry Practical", room: "Lab 2", color: "bg-red-500", isExam: true },
  ],
  Thursday: [
    { time: "09:00 - 11:00", class: "Class 10-A", subject: "Science Exam", room: "Hall A", color: "bg-red-500", isExam: true },
  ],
  Friday: [
    { time: "09:00 - 11:00", class: "Class 9-B", subject: "Physics Practical", room: "Lab 1", color: "bg-red-500", isExam: true },
  ],
}

const subjectColors: { [key: string]: string } = {
  "Mathematics": "bg-blue-500 text-white border-blue-600",
  "Physics": "bg-purple-500 text-white border-purple-600",
  "Chemistry": "bg-green-500 text-white border-green-600",
  "Chemistry Lab": "bg-green-500 text-white border-green-600",
  "Physics Lab": "bg-purple-500 text-white border-purple-600",
}

// Check if current date is in exam period
const isExamPeriod = () => {
  const today = new Date()
  const examStart = new Date('2024-03-15')
  const examEnd = new Date('2024-03-25')
  return today >= examStart && today <= examEnd
}

export default function TeacherTimetable() {
  const [viewMode, setViewMode] = useState<'regular' | 'exam'>(isExamPeriod() ? 'exam' : 'regular')
  
  const currentTimetable = viewMode === 'exam' ? examTimetable : regularTimetable

  const getClassForTimeSlot = (day: string, timeSlot: string) => {
    const daySchedule = currentTimetable[day as keyof typeof currentTimetable]
    return daySchedule?.find(item => item.time === timeSlot)
  }

  return (
    <TeacherLayout title="Timetable" showBackButton>
      <div className="space-y-6">
        {/* Header with View Toggle */}
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  {viewMode === 'regular' ? 'Regular Teaching Schedule' : 'Exam Period Schedule'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {viewMode === 'regular' ? 'Your fixed weekly timetable' : 'Exam supervision schedule (Mar 15-25, 2024)'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as 'regular' | 'exam')}>
                  <TabsList>
                    <TabsTrigger value="regular">Regular Schedule</TabsTrigger>
                    <TabsTrigger value="exam" className="flex items-center gap-2">
                      {isExamPeriod() && <AlertCircle className="w-4 h-4 text-destructive" />}
                      Exam Period
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Exam Period Warning */}
        {isExamPeriod() && (
          <Card className="border-destructive bg-destructive/5 animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <div>
                  <p className="font-semibold text-destructive">Exam Period Active</p>
                  <p className="text-sm text-muted-foreground">Regular classes are suspended. Follow exam supervision schedule.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subject Legend */}
        <Card className="animate-slide-up" style={{ animationDelay: viewMode === 'exam' && isExamPeriod() ? "100ms" : "50ms" }}>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                {viewMode === 'regular' ? 'Subjects:' : 'Exam Sessions:'}
              </span>
              {viewMode === 'regular' ? (
                <>
                  <Badge className="bg-blue-500 text-white">Mathematics</Badge>
                  <Badge className="bg-purple-500 text-white">Physics</Badge>
                  <Badge className="bg-green-500 text-white">Chemistry</Badge>
                </>
              ) : (
                <Badge className="bg-red-500 text-white">Exam Supervision</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timetable Grid */}
        <Card className="animate-slide-up" style={{ animationDelay: viewMode === 'exam' && isExamPeriod() ? "150ms" : "100ms" }}>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                {/* Header Row */}
                <div className="grid grid-cols-6 gap-2 mb-2">
                  <div className="font-semibold text-sm text-muted-foreground p-3">Time</div>
                  {weekDays.map((day) => (
                    <div key={day} className="font-semibold text-sm text-foreground text-center p-3 bg-muted/30 rounded-lg">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((timeSlot) => (
                  <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
                    <div className="flex items-center p-3 text-sm text-muted-foreground font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      {timeSlot}
                    </div>
                    {weekDays.map((day) => {
                      const classItem = getClassForTimeSlot(day, timeSlot)
                      
                      return (
                        <div key={`${day}-${timeSlot}`} className="min-h-[80px]">
                          {classItem ? (
                            <div className={`${viewMode === 'exam' ? 'bg-red-500 text-white border-red-600' : subjectColors[classItem.subject]} h-full p-3 rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer`}>
                              <p className="font-semibold text-sm mb-1">{classItem.subject}</p>
                              <p className="text-xs opacity-90 mb-1">{classItem.class}</p>
                              <div className="flex items-center gap-1 text-xs opacity-80">
                                <MapPin className="w-3 h-3" />
                                {classItem.room}
                              </div>
                            </div>
                          ) : (
                            <div className="h-full bg-muted/20 rounded-lg border border-dashed border-muted-foreground/20"></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="animate-slide-up" style={{ animationDelay: viewMode === 'exam' && isExamPeriod() ? "200ms" : "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{viewMode === 'regular' ? 'Total Classes' : 'Exam Sessions'}</p>
                  <p className="text-3xl font-bold text-foreground">{viewMode === 'regular' ? '18' : '8'}</p>
                  <p className="text-xs text-muted-foreground mt-1">{viewMode === 'regular' ? 'Per week' : 'This period'}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: viewMode === 'exam' && isExamPeriod() ? "250ms" : "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{viewMode === 'regular' ? 'Teaching Hours' : 'Supervision Hours'}</p>
                  <p className="text-3xl font-bold text-foreground">{viewMode === 'regular' ? '18' : '16'}</p>
                  <p className="text-xs text-muted-foreground mt-1">{viewMode === 'regular' ? 'Per week' : 'Total hours'}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success-light flex items-center justify-center">
                  <Clock className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: viewMode === 'exam' && isExamPeriod() ? "300ms" : "250ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's {viewMode === 'regular' ? 'Classes' : 'Sessions'}</p>
                  <p className="text-3xl font-bold text-foreground">{viewMode === 'regular' ? '4' : '2'}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-info-light flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  )
}
