"use client"

import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, Download, Eye, Mail, Phone, MapPin, 
  TrendingUp, BookOpen, Award, Calendar, Users
} from "lucide-react"
import { useState, useEffect } from "react"

const students = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    rollNo: "2024001", 
    class: "Class 10-A", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    attendanceRate: 95,
    averageScore: 88,
    email: "emma.j@school.edu",
    phone: "+1 234-567-8901",
    address: "123 Oak Street, Springfield",
    parentName: "Michael Johnson",
    parentPhone: "+1 234-567-8900"
  },
  { 
    id: 2, 
    name: "Liam Smith", 
    rollNo: "2024002", 
    class: "Class 10-A", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    attendanceRate: 92,
    averageScore: 85,
    email: "liam.s@school.edu",
    phone: "+1 234-567-8902",
    address: "456 Maple Avenue, Springfield",
    parentName: "Sarah Smith",
    parentPhone: "+1 234-567-8903"
  },
  { 
    id: 3, 
    name: "Olivia Brown", 
    rollNo: "2024003", 
    class: "Class 10-A", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    attendanceRate: 98,
    averageScore: 92,
    email: "olivia.b@school.edu",
    phone: "+1 234-567-8904",
    address: "789 Pine Road, Springfield",
    parentName: "David Brown",
    parentPhone: "+1 234-567-8905"
  },
  { 
    id: 4, 
    name: "Noah Davis", 
    rollNo: "2024015", 
    class: "Class 9-B", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
    attendanceRate: 88,
    averageScore: 78,
    email: "noah.d@school.edu",
    phone: "+1 234-567-8906",
    address: "321 Cedar Lane, Springfield",
    parentName: "Emily Davis",
    parentPhone: "+1 234-567-8907"
  },
  { 
    id: 5, 
    name: "Ava Wilson", 
    rollNo: "2024016", 
    class: "Class 9-B", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    attendanceRate: 94,
    averageScore: 90,
    email: "ava.w@school.edu",
    phone: "+1 234-567-8908",
    address: "654 Birch Street, Springfield",
    parentName: "Robert Wilson",
    parentPhone: "+1 234-567-8909"
  },
  { 
    id: 6, 
    name: "Ethan Martinez", 
    rollNo: "2024030", 
    class: "Class 11-C", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    attendanceRate: 90,
    averageScore: 86,
    email: "ethan.m@school.edu",
    phone: "+1 234-567-8910",
    address: "987 Elm Drive, Springfield",
    parentName: "Jennifer Martinez",
    parentPhone: "+1 234-567-8911"
  },
  { 
    id: 7, 
    name: "Sophia Garcia", 
    rollNo: "2024031", 
    class: "Class 11-C", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    attendanceRate: 96,
    averageScore: 94,
    email: "sophia.g@school.edu",
    phone: "+1 234-567-8912",
    address: "147 Willow Court, Springfield",
    parentName: "Carlos Garcia",
    parentPhone: "+1 234-567-8913"
  },
]

export default function TeacherStudents() {
  useEffect(() => {
      document.title = "Students"
    }, [])
  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null)

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.includes(searchQuery)
    const matchesClass = classFilter === "all" || student.class === classFilter
    return matchesSearch && matchesClass
  })

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-success"
    if (rate >= 75) return "text-warning"
    return "text-destructive"
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success"
    if (score >= 70) return "text-warning"
    return "text-destructive"
  }

  return (
    <TeacherLayout title="Students" showBackButton>
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{students.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  <p className="text-3xl font-bold text-success">93%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success-light flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-3xl font-bold text-primary">87%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-info-light flex items-center justify-center">
                  <Award className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Classes</p>
                  <p className="text-3xl font-bold text-foreground">6</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>Student Directory</CardTitle>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Class 10-A">Class 10-A</SelectItem>
                  <SelectItem value="Class 9-B">Class 9-B</SelectItem>
                  <SelectItem value="Class 11-C">Class 11-C</SelectItem>
                  <SelectItem value="Class 10-B">Class 10-B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Students Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Student</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Roll No</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Class</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Attendance</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Avg Score</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{student.rollNo}</Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{student.class}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[80px] h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${student.attendanceRate >= 90 ? 'bg-success' : student.attendanceRate >= 75 ? 'bg-warning' : 'bg-destructive'}`}
                                style={{ width: `${student.attendanceRate}%` }}
                              />
                            </div>
                            <span className={`text-sm font-semibold ${getAttendanceColor(student.attendanceRate)}`}>
                              {student.attendanceRate}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-sm font-semibold ${getScoreColor(student.averageScore)}`}>
                            {student.averageScore}%
                          </span>
                        </td>
                        <td className="p-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedStudent(student)}
                                className="flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Student Details</DialogTitle>
                              </DialogHeader>
                              {selectedStudent && (
                                <div className="space-y-6">
                                  <div className="flex items-start gap-6">
                                    <Avatar className="w-24 h-24">
                                      <AvatarImage src={selectedStudent.avatar} />
                                      <AvatarFallback className="text-2xl">
                                        {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <h3 className="text-2xl font-bold text-foreground mb-1">{selectedStudent.name}</h3>
                                      <p className="text-muted-foreground mb-3">{selectedStudent.class} • Roll No: {selectedStudent.rollNo}</p>
                                      <div className="flex gap-3">
                                        <Badge className="bg-success">{selectedStudent.attendanceRate}% Attendance</Badge>
                                        <Badge className="bg-primary">{selectedStudent.averageScore}% Average</Badge>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Contact Information</h4>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{selectedStudent.email}</span>
                                          </div>
                                          <div className="flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{selectedStudent.phone}</span>
                                          </div>
                                          <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{selectedStudent.address}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Parent/Guardian</h4>
                                        <div className="space-y-2">
                                          <p className="text-sm font-medium text-foreground">{selectedStudent.parentName}</p>
                                          <div className="flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-foreground">{selectedStudent.parentPhone}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardContent className="pt-6">
                                        <div className="text-center">
                                          <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-2">
                                            <TrendingUp className="w-8 h-8 text-success" />
                                          </div>
                                          <p className="text-3xl font-bold text-success mb-1">{selectedStudent.attendanceRate}%</p>
                                          <p className="text-sm text-muted-foreground">Attendance Rate</p>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardContent className="pt-6">
                                        <div className="text-center">
                                          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-2">
                                            <Award className="w-8 h-8 text-primary" />
                                          </div>
                                          <p className="text-3xl font-bold text-primary mb-1">{selectedStudent.averageScore}%</p>
                                          <p className="text-sm text-muted-foreground">Average Score</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No students found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  )
}
