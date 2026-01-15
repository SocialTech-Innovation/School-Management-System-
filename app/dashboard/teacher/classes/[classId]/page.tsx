"use client"

import { useEffect, useState } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  BookOpen, Users, TrendingUp, Calendar, MapPin, Clock,
  Search, Filter, Download, Mail, Phone, Home, Award,
  CheckCircle, XCircle, TrendingDown, BarChart3
} from "lucide-react"
import { useParams } from "next/navigation"

// Mock data
const classData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Class 10-A",
    subject: "Mathematics",
    room: "201",
    schedule: "Mon, Wed, Fri 08:00-09:00",
    students: 35,
    attendance: 94,
    avgScore: 87,
    teacher: "Prof. Sarah Anderson"
  },
  "2": {
    id: "2",
    name: "Class 9-B",
    subject: "Physics",
    room: "305",
    schedule: "Tue, Thu 09:00-10:00",
    students: 32,
    attendance: 92,
    avgScore: 85,
    teacher: "Prof. Sarah Anderson"
  },
  "3": {
    id: "3",
    name: "Class 11-C",
    subject: "Chemistry",
    room: "308",
    schedule: "Mon, Wed 10:00-11:00",
    students: 28,
    attendance: 96,
    avgScore: 89,
    teacher: "Prof. Sarah Anderson"
  }
}

const studentsData = [
  { id: "1", name: "Emma Johnson", rollNumber: "2024001", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", attendance: 96, grade: "A", avgScore: 92, email: "emma.j@school.edu", phone: "+1234567890", address: "123 Main St", parent: "John Johnson" },
  { id: "2", name: "Liam Smith", rollNumber: "2024002", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam", attendance: 94, grade: "A", avgScore: 88, email: "liam.s@school.edu", phone: "+1234567891", address: "456 Oak Ave", parent: "Mary Smith" },
  { id: "3", name: "Olivia Brown", rollNumber: "2024003", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia", attendance: 98, grade: "A+", avgScore: 95, email: "olivia.b@school.edu", phone: "+1234567892", address: "789 Pine Rd", parent: "David Brown" },
  { id: "4", name: "Noah Williams", rollNumber: "2024004", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah", attendance: 92, grade: "B+", avgScore: 85, email: "noah.w@school.edu", phone: "+1234567893", address: "321 Elm St", parent: "Sarah Williams" },
  { id: "5", name: "Ava Davis", rollNumber: "2024005", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava", attendance: 90, grade: "B", avgScore: 82, email: "ava.d@school.edu", phone: "+1234567894", address: "654 Maple Dr", parent: "James Davis" },
  { id: "6", name: "Ethan Martinez", rollNumber: "2024006", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan", attendance: 95, grade: "A", avgScore: 90, email: "ethan.m@school.edu", phone: "+1234567895", address: "987 Cedar Ln", parent: "Lisa Martinez" },
  { id: "7", name: "Sophia Garcia", rollNumber: "2024007", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia", attendance: 88, grade: "B", avgScore: 80, email: "sophia.g@school.edu", phone: "+1234567896", address: "147 Birch Ct", parent: "Carlos Garcia" },
  { id: "8", name: "Mason Rodriguez", rollNumber: "2024008", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mason", attendance: 93, grade: "A-", avgScore: 87, email: "mason.r@school.edu", phone: "+1234567897", address: "258 Walnut St", parent: "Maria Rodriguez" },
]

const attendanceHistory = [
  { date: "2024-01-08", present: 33, absent: 2, percentage: 94 },
  { date: "2024-01-05", present: 34, absent: 1, percentage: 97 },
  { date: "2024-01-03", present: 32, absent: 3, percentage: 91 },
  { date: "2023-12-29", present: 35, absent: 0, percentage: 100 },
  { date: "2023-12-27", present: 33, absent: 2, percentage: 94 },
  { date: "2023-12-22", present: 31, absent: 4, percentage: 89 },
]

const performanceData = [
  { assessment: "Mid-Term Exam", date: "2024-01-05", avgScore: 85, highestScore: 98, lowestScore: 62 },
  { assessment: "Quiz 5 - Calculus", date: "2023-12-20", avgScore: 88, highestScore: 100, lowestScore: 70 },
  { assessment: "Assignment 4", date: "2023-12-15", avgScore: 90, highestScore: 100, lowestScore: 75 },
  { assessment: "Quiz 4 - Algebra", date: "2023-12-10", avgScore: 82, highestScore: 95, lowestScore: 58 },
]

export default function ClassDetailPage() {
  useEffect(() => {
      document.title = `${classData[classId].name}`
    }, [])
  const params = useParams()
  const classId = params.classId as string
  const classInfo = classData[classId]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)

  if (!classInfo) {
    return (
      <TeacherLayout title="Class Not Found" showBackButton>
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Class not found</p>
        </div>
      </TeacherLayout>
    )
  }

  const filteredStudents = studentsData.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student)
    setShowStudentModal(true)
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-success text-white"
    if (grade.startsWith("B")) return "bg-info text-white"
    if (grade.startsWith("C")) return "bg-warning text-white"
    return "bg-destructive text-white"
  }

  return (
    <TeacherLayout title={classInfo.name} showBackButton>
      <div className="space-y-6">
        {/* Class Info Banner */}
        <Card className="animate-slide-up gradient-primary border-0">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">{classInfo.name}</h2>
                <p className="text-white/90 text-lg mb-4">{classInfo.subject}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Room {classInfo.room}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{classInfo.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{classInfo.students} Students</span>
                  </div>
                </div>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{classInfo.students}</p>
                </div>
                <Users className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  <p className="text-3xl font-bold text-success">{classInfo.attendance}%</p>
                </div>
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-info">{classInfo.avgScore}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                  <p className="text-3xl font-bold text-primary">95%</p>
                </div>
                <Award className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
          <CardContent className="pt-6">
            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              {/* Students Tab */}
              <TabsContent value="students" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">#</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Student</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Roll Number</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Attendance</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Avg Score</th>
                          <th className="text-left p-4 text-sm font-semibold text-foreground">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredStudents.map((student, index) => (
                          <tr 
                            key={student.id}
                            onClick={() => handleStudentClick(student)}
                            className="hover:bg-muted/30 cursor-pointer transition-colors animate-slide-up"
                            style={{ animationDelay: `${300 + index * 30}ms` }}
                          >
                            <td className="p-4">
                              <span className="text-muted-foreground font-medium">{index + 1}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={student.avatar} />
                                  <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-foreground">{student.name}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{student.rollNumber}</Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-success"
                                    style={{ width: `${student.attendance}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium text-foreground">{student.attendance}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-medium text-foreground">{student.avgScore}</span>
                            </td>
                            <td className="p-4">
                              <Badge className={getGradeColor(student.grade)}>{student.grade}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* Attendance Tab */}
              <TabsContent value="attendance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Average Attendance</p>
                          <p className="text-2xl font-bold text-success">{classInfo.attendance}%</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Best Attendance</p>
                          <p className="text-2xl font-bold text-primary">100%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Lowest Attendance</p>
                          <p className="text-2xl font-bold text-warning">89%</p>
                        </div>
                        <TrendingDown className="w-8 h-8 text-warning" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Attendance History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {attendanceHistory.map((record, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors animate-slide-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">
                                {new Date(record.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {record.present} Present • {record.absent} Absent
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${record.percentage >= 95 ? 'bg-success' : record.percentage >= 85 ? 'bg-info' : 'bg-warning'}`}
                                style={{ width: `${record.percentage}%` }}
                              />
                            </div>
                            <Badge className={record.percentage >= 95 ? 'bg-success' : record.percentage >= 85 ? 'bg-info' : 'bg-warning'}>
                              {record.percentage}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Class Average</p>
                          <p className="text-2xl font-bold text-info">{classInfo.avgScore}</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-info" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Top Performer</p>
                          <p className="text-2xl font-bold text-success">95</p>
                        </div>
                        <Award className="w-8 h-8 text-success" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Pass Rate</p>
                          <p className="text-2xl font-bold text-primary">95%</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {performanceData.map((assessment, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-lg border hover:bg-muted/30 transition-colors animate-slide-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-foreground">{assessment.assessment}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(assessment.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                            <Badge className="bg-info text-white">
                              Avg: {assessment.avgScore}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Average</p>
                              <p className="text-lg font-bold text-info">{assessment.avgScore}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Highest</p>
                              <p className="text-lg font-bold text-success">{assessment.highestScore}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Lowest</p>
                              <p className="text-lg font-bold text-warning">{assessment.lowestScore}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Student Profile Modal */}
        <Dialog open={showStudentModal} onOpenChange={setShowStudentModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedStudent.avatar} />
                    <AvatarFallback className="text-2xl">
                      {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{selectedStudent.name}</h3>
                    <Badge variant="outline" className="mb-2">{selectedStudent.rollNumber}</Badge>
                    <div className="flex gap-2">
                      <Badge className={getGradeColor(selectedStudent.grade)}>{selectedStudent.grade}</Badge>
                      <Badge className="bg-info text-white">Score: {selectedStudent.avgScore}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Attendance</p>
                          <p className="text-2xl font-bold text-success">{selectedStudent.attendance}%</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Average Score</p>
                          <p className="text-2xl font-bold text-info">{selectedStudent.avgScore}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-info" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{selectedStudent.address}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">Parent: {selectedStudent.parent}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  )
}
