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
              <Plus className="w-4 h-4 mr-2" />
              Enter Grades
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

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by student name or ID..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="9-a">Grade 9-A</SelectItem>
                  <SelectItem value="10-a">Grade 10-A</SelectItem>
                  <SelectItem value="11-a">Grade 11-A</SelectItem>
                  <SelectItem value="12-a">Grade 12-A</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mid-2026">Mid-Term 2026</SelectItem>
                  <SelectItem value="final-2025">Final 2025</SelectItem>
                  <SelectItem value="mid-2025">Mid-Term 2025</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Student Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentGrades.map((student) => (
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
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Report Card
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit Grades
                    </Button>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
