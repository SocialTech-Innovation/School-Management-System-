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
  BookOpen,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  Users,
  Clock,
} from "lucide-react"

const subjects = [
  {
    id: 1,
    code: "MATH-101",
    name: "Mathematics",
    grade: "Grade 10",
    teacher: "Mrs. Anderson",
    students: 120,
    periods: 6,
    category: "Core",
    description: "Advanced mathematics including algebra and geometry",
  },
  {
    id: 2,
    code: "PHY-201",
    name: "Physics",
    grade: "Grade 11-12",
    teacher: "Mr. Johnson",
    students: 85,
    periods: 5,
    category: "Science",
    description: "Mechanics, thermodynamics, and electromagnetism",
  },
  {
    id: 3,
    code: "ENG-101",
    name: "English Literature",
    grade: "Grade 9-10",
    teacher: "Ms. Williams",
    students: 150,
    periods: 5,
    category: "Languages",
    description: "Classic and modern English literature analysis",
  },
  {
    id: 4,
    code: "CHEM-201",
    name: "Chemistry",
    grade: "Grade 11-12",
    teacher: "Dr. Brown",
    students: 78,
    periods: 5,
    category: "Science",
    description: "Organic, inorganic, and physical chemistry",
  },
  {
    id: 5,
    code: "HIST-101",
    name: "History",
    grade: "Grade 9-10",
    teacher: "Mr. Davis",
    students: 130,
    periods: 4,
    category: "Social Studies",
    description: "World history from ancient to modern times",
  },
  {
    id: 6,
    code: "CS-101",
    name: "Computer Science",
    grade: "Grade 10-12",
    teacher: "Ms. Garcia",
    students: 95,
    periods: 5,
    category: "Technology",
    description: "Programming fundamentals and algorithms",
  },
]

const categories = ["Core", "Science", "Languages", "Social Studies", "Technology", "Arts", "Physical Education"]

export default function SubjectsPage() {
  return (
    <AdminLayout title="Subjects">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Subject Management</h2>
            <p className="text-muted-foreground mt-1">Manage curriculum and subject assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Subjects</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{subjects.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{categories.length}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{subjects.reduce((sum, s) => sum + s.students, 0)}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Periods</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{subjects.reduce((sum, s) => sum + s.periods, 0)}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
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
                <Input placeholder="Search subjects by name or code..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
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
          </CardContent>
        </Card>

        {/* Subjects Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Code</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Grade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Teacher</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Students</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Periods/Week</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => (
                    <tr key={subject.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-foreground font-semibold">{subject.code}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-foreground">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="font-medium">{subject.category}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-foreground">{subject.grade}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-foreground">{subject.teacher}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {subject.students}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-medium text-foreground">{subject.periods}</span>
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
