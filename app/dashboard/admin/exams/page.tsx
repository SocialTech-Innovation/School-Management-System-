"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Download,
  Edit,
  Trash2,
  Eye,
  FileText,
  Users,
} from "lucide-react"
import { useState, useEffect } from "react"

const exams = [
  {
    id: 1,
    subject: "Mathematics",
    type: "Mid-Term",
    class: "Grade 10-A",
    date: "Jan 24, 2026",
    time: "09:00 AM - 11:00 AM",
    duration: "2 hours",
    totalMarks: 100,
    students: 45,
    status: "Scheduled",
    teacher: "Prof. John Smith",
  },
  {
    id: 2,
    subject: "Physics",
    type: "Lab Practical",
    class: "Grade 12-B",
    date: "Jan 25, 2026",
    time: "02:00 PM - 04:00 PM",
    duration: "2 hours",
    totalMarks: 50,
    students: 38,
    status: "Scheduled",
    teacher: "Dr. Sarah Johnson",
  },
  {
    id: 3,
    subject: "English Literature",
    type: "Final Exam",
    class: "Grade 9-C",
    date: "Jan 28, 2026",
    time: "10:00 AM - 12:00 PM",
    duration: "2 hours",
    totalMarks: 100,
    students: 42,
    status: "Ready",
    teacher: "Mrs. Emily Davis",
  },
  {
    id: 4,
    subject: "Chemistry",
    type: "Mid-Term",
    class: "Grade 11-A",
    date: "Feb 02, 2026",
    time: "09:00 AM - 11:00 AM",
    duration: "2 hours",
    totalMarks: 100,
    students: 40,
    status: "Draft",
    teacher: "Dr. Michael Chen",
  },
  {
    id: 5,
    subject: "History",
    type: "Quiz",
    class: "Grade 10-B",
    date: "Jan 20, 2026",
    time: "11:00 AM - 12:00 PM",
    duration: "1 hour",
    totalMarks: 50,
    students: 43,
    status: "Completed",
    teacher: "Mr. David Wilson",
  },
]

export default function ExaminationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
      document.title = "Examinations"
    }, [])
  // Filter exams
  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || exam.type === typeFilter
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter
    const matchesClass = classFilter === "all" || exam.class.includes(classFilter)
    return matchesSearch && matchesType && matchesStatus && matchesClass
  })

  const upcomingExams = exams.filter((e) => e.status === "Scheduled" || e.status === "Ready")
  const completedExams = exams.filter((e) => e.status === "Completed")
  const draftExams = exams.filter((e) => e.status === "Draft")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Completed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout title="Examinations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Examination Management</h2>
            <p className="text-muted-foreground mt-1">Schedule and manage school examinations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Exam
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Schedule New Exam</DialogTitle>
                  <DialogDescription>
                    Create and schedule a new examination.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="english">English Literature</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="examType">Exam Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mid-term">Mid-Term</SelectItem>
                          <SelectItem value="final">Final Exam</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="practical">Lab Practical</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9a">Grade 9-A</SelectItem>
                          <SelectItem value="9b">Grade 9-B</SelectItem>
                          <SelectItem value="10a">Grade 10-A</SelectItem>
                          <SelectItem value="10b">Grade 10-B</SelectItem>
                          <SelectItem value="11a">Grade 11-A</SelectItem>
                          <SelectItem value="12a">Grade 12-A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="teacher">Assigned Teacher *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Prof. John Smith</SelectItem>
                          <SelectItem value="2">Dr. Sarah Johnson</SelectItem>
                          <SelectItem value="3">Mrs. Emily Davis</SelectItem>
                          <SelectItem value="4">Dr. Michael Chen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="examDate">Date *</Label>
                      <Input id="examDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input id="startTime" type="time" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (hours) *</Label>
                      <Input id="duration" type="number" placeholder="2" min="0.5" step="0.5" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalMarks">Total Marks *</Label>
                      <Input id="totalMarks" type="number" placeholder="100" min="1" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions/Notes</Label>
                    <Input id="instructions" placeholder="Special instructions or requirements..." />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Schedule Exam
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Exams</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{exams.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{upcomingExams.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{completedExams.length}</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{draftExams.length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exams Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Examinations ({filteredExams.length})</CardTitle>
              
              {/* Search and Filters inside card */}
              <div className="flex gap-3 flex-wrap w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search exams..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                    <SelectItem value="Final Exam">Final Exam</SelectItem>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Lab Practical">Lab Practical</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Ready">Ready</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredExams.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No exams found matching your criteria
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.subject}</TableCell>
                        <TableCell>{exam.type}</TableCell>
                        <TableCell>{exam.class}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{exam.date}</div>
                            <div className="text-muted-foreground">{exam.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{exam.duration}</TableCell>
                        <TableCell>{exam.totalMarks}</TableCell>
                        <TableCell>{exam.students}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(exam.status)}>
                            {exam.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
