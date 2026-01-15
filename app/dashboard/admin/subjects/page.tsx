"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  BookOpen,
  Plus,
  Search,
  Download,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  Users,
  Clock,
} from "lucide-react"
import { useState, useEffect } from "react"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter subjects
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || subject.category === categoryFilter
    const matchesGrade = gradeFilter === "all" || subject.grade.includes(gradeFilter)
    return matchesSearch && matchesCategory && matchesGrade
  })

  useEffect(() => {
    document.title = "Subjects - Skops"
  }, [])

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
            <Dialog open={isAddDialogOpen} onValueChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Subject</DialogTitle>
                  <DialogDescription>
                    Add a new subject to the curriculum.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subjectCode">Subject Code *</Label>
                      <Input id="subjectCode" placeholder="MATH-101" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subjectName">Subject Name *</Label>
                      <Input id="subjectName" placeholder="Mathematics" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher">Assigned Teacher *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Mrs. Anderson</SelectItem>
                          <SelectItem value="2">Mr. Johnson</SelectItem>
                          <SelectItem value="3">Ms. Williams</SelectItem>
                          <SelectItem value="4">Dr. Brown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="periods">Periods Per Week *</Label>
                      <Input id="periods" type="number" placeholder="6" min="1" max="10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter subject description..." 
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Add Subject
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
                  <p className="text-2xl font-bold text-foreground mt-1">658</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Periods</p>
                  <p className="text-2xl font-bold text-foreground mt-1">30</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Subjects ({filteredSubjects.length})</CardTitle>
              
              {/* Search and Filters inside card */}
              <div className="flex gap-3 flex-wrap w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search subjects..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
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
            {filteredSubjects.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No subjects found matching your criteria
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSubjects.map((subject) => (
                  <Card key={subject.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2">{subject.code}</Badge>
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                          {subject.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{subject.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Grade:</span>
                          <span className="font-medium">{subject.grade}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Teacher:</span>
                          <span className="font-medium">{subject.teacher}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Students:</span>
                          <span className="font-medium">{subject.students}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Periods/Week:</span>
                          <span className="font-medium">{subject.periods}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
