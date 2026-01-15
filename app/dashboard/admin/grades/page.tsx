"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Award,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
} from "lucide-react"
import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const gradeDistribution = [
  { grade: "A+", count: 45 },
  { grade: "A", count: 68 },
  { grade: "B+", count: 82 },
  { grade: "B", count: 95 },
  { grade: "C+", count: 58 },
  { grade: "C", count: 32 },
  { grade: "D", count: 18 },
  { grade: "F", count: 8 },
]

const studentGrades = [
  {
    id: 1,
    studentId: "S001",
    name: "John Doe",
    class: "Grade 10-A",
    term: "Mid-Term 2026",
    subjects: [
      { subject: "Mathematics", marks: 92, grade: "A+", teacher: "Mrs. Anderson" },
      { subject: "Physics", marks: 88, grade: "A", teacher: "Mr. Johnson" },
      { subject: "English", marks: 85, grade: "A", teacher: "Ms. Williams" },
      { subject: "Chemistry", marks: 90, grade: "A+", teacher: "Dr. Brown" },
      { subject: "History", marks: 78, grade: "B+", teacher: "Mr. Davis" },
    ],
    average: 86.6,
    overall: "A",
    rank: 3,
    status: "Published",
  },
  {
    id: 2,
    studentId: "S002",
    name: "Jane Smith",
    class: "Grade 10-A",
    term: "Mid-Term 2026",
    subjects: [
      { subject: "Mathematics", marks: 95, grade: "A+", teacher: "Mrs. Anderson" },
      { subject: "Physics", marks: 92, grade: "A+", teacher: "Mr. Johnson" },
      { subject: "English", marks: 90, grade: "A+", teacher: "Ms. Williams" },
      { subject: "Chemistry", marks: 94, grade: "A+", teacher: "Dr. Brown" },
      { subject: "History", marks: 88, grade: "A", teacher: "Mr. Davis" },
    ],
    average: 91.8,
    overall: "A+",
    rank: 1,
    status: "Published",
  },
  {
    id: 3,
    studentId: "S003",
    name: "Mike Johnson",
    class: "Grade 10-A",
    term: "Mid-Term 2026",
    subjects: [
      { subject: "Mathematics", marks: 75, grade: "B+", teacher: "Mrs. Anderson" },
      { subject: "Physics", marks: 72, grade: "B", teacher: "Mr. Johnson" },
      { subject: "English", marks: 80, grade: "A", teacher: "Ms. Williams" },
      { subject: "Chemistry", marks: 78, grade: "B+", teacher: "Dr. Brown" },
      { subject: "History", marks: 82, grade: "A", teacher: "Mr. Davis" },
    ],
    average: 77.4,
    overall: "B+",
    rank: 12,
    status: "Draft",
  },
]

export default function GradesPage() {
  useEffect(() => {
    document.title = "Grades - Skops"
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [termFilter, setTermFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // Filter grades
  const filteredGrades = studentGrades.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === "all" || student.class.includes(classFilter)
    const matchesTerm = termFilter === "all" || student.term === termFilter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesClass && matchesTerm && matchesStatus
  })

  return (
    <AdminLayout title="Grades">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Grade Management</h2>
            <p className="text-muted-foreground mt-1">Manage student grades and academic performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report Cards
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Class Average</p>
                  <p className="text-2xl font-bold text-foreground mt-1">85.3%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-semibold">+3.2%</span>
                  </div>
                </div>
                <Award className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                  <p className="text-2xl font-bold text-foreground mt-1">94.2%</p>
                  <p className="text-xs text-muted-foreground mt-2">382 of 406 students</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Graded Students</p>
                  <p className="text-2xl font-bold text-foreground mt-1">406</p>
                  <p className="text-xs text-muted-foreground mt-2">Mid-Term 2026</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reports Published</p>
                  <p className="text-2xl font-bold text-foreground mt-1">324</p>
                  <p className="text-xs text-muted-foreground mt-2">82 pending</p>
                </div>
                <FileText className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grade Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="grade"
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" name="Students" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Student Grades Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>Student Grades ({filteredGrades.length})</CardTitle>
              
              {/* Search and Filters inside card */}
              <div className="flex gap-3 flex-wrap w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={termFilter} onValueChange={setTermFilter}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Terms</SelectItem>
                    <SelectItem value="Mid-Term 2026">Mid-Term 2026</SelectItem>
                    <SelectItem value="Final 2025">Final 2025</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredGrades.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No grades found matching your criteria
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGrades.map((student) => (
                  <div key={student.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{student.name}</h3>
                        <Badge variant="outline">{student.studentId}</Badge>
                        <Badge variant="outline">{student.class}</Badge>
                        <Badge
                          className={
                            student.status === "Published"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        >
                          {student.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Term: {student.term}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Average</p>
                          <p className="text-2xl font-bold text-foreground">{student.average}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Grade</p>
                          <p className="text-2xl font-bold text-blue-600">{student.overall}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rank</p>
                          <p className="text-2xl font-bold text-foreground">#{student.rank}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subject Grades */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
                    {student.subjects.map((subj, idx) => (
                      <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs font-semibold text-blue-900 mb-1">{subj.subject}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-xl font-bold text-blue-600">{subj.marks}</p>
                          <Badge variant="outline" className="text-xs">{subj.grade}</Badge>
                        </div>
                        <p className="text-xs text-blue-700 mt-1">{subj.teacher}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedStudent(student)
                        setIsReportDialogOpen(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Report Card
                    </Button>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Report Card Dialog */}
        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Report Card</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6 mt-4">
                {/* Student Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{selectedStudent.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedStudent.studentId} • {selectedStudent.class}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedStudent.term}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Overall Grade</p>
                        <p className="text-3xl font-bold text-blue-600">{selectedStudent.overall}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Average</p>
                        <p className="text-3xl font-bold text-foreground">{selectedStudent.average}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Class Rank</p>
                        <p className="text-3xl font-bold text-foreground">#{selectedStudent.rank}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grades Table */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Subject Performance</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-blue-900">Subject</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-blue-900">Teacher</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-blue-900">Marks</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-blue-900">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.subjects.map((subj: any, idx: number) => (
                          <tr key={idx} className="border-t hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-foreground">{subj.subject}</td>
                            <td className="py-3 px-4 text-muted-foreground">{subj.teacher}</td>
                            <td className="py-3 px-4 text-center font-semibold text-foreground">{subj.marks}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="font-medium">{subj.grade}</Badge>
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t bg-blue-50 font-semibold">
                          <td className="py-3 px-4 text-blue-900" colSpan={2}>Overall</td>
                          <td className="py-3 px-4 text-center text-blue-900">{selectedStudent.average}%</td>
                          <td className="py-3 px-4 text-center">
                            <Badge className="bg-blue-600 text-white font-medium">{selectedStudent.overall}</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
