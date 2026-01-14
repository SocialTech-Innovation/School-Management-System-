"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  FileText,
  Users,
} from "lucide-react"

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

const upcomingExams = exams.filter((e) => e.status === "Scheduled" || e.status === "Ready")
const completedExams = exams.filter((e) => e.status === "Completed")
const draftExams = exams.filter((e) => e.status === "Draft")

export default function ExaminationsPage() {
  return (
    <AdminLayout title="Examinations">
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Examination Management</h2>
            <p className="text-muted-foreground mt-1">Schedule and manage school examinations</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Schedule New Exam
          </Button>
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
                <FileText className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search exams..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Exam Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="midterm">Mid-Term</SelectItem>
                  <SelectItem value="final">Final Exam</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exams Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Examinations</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Class</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date & Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Students</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => (
                    <tr key={exam.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-foreground">{exam.subject}</p>
                          <p className="text-xs text-muted-foreground">{exam.teacher}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-foreground">{exam.type}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-foreground">{exam.class}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-foreground">{exam.date}</p>
                          <p className="text-xs text-muted-foreground">{exam.time}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{exam.students}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={
                            exam.status === "Scheduled"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : exam.status === "Ready"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : exam.status === "Completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {exam.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
