"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Download, Edit, Trash2, Eye, BookOpen, Users, GraduationCap, LayoutGrid, List } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminClasses() {
  useEffect(() => {
    document.title = "Classes"
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const classes = [
    { id: "CLASS-001", name: "10-A", teacher: "Mrs. Anderson", students: 35, capacity: 40, subject: "Mathematics", room: "Room 201" },
    { id: "CLASS-002", name: "10-B", teacher: "Mr. Johnson", students: 38, capacity: 40, subject: "Physics", room: "Room 202" },
    { id: "CLASS-003", name: "9-A", teacher: "Ms. Williams", students: 32, capacity: 40, subject: "English", room: "Room 301" },
    { id: "CLASS-004", name: "9-B", teacher: "Mr. Brown", students: 36, capacity: 40, subject: "Chemistry", room: "Room 302" },
  ]

  // Filter logic
  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch = 
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesGrade = gradeFilter === "all" || classItem.name.startsWith(gradeFilter)

    return matchesSearch && matchesGrade
  })

  return (
    <AdminLayout title="Classes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Class Management</h2>
            <p className="text-muted-foreground mt-1">Manage classes and assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Class
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{classes.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{classes.reduce((sum, c) => sum + c.capacity, 0)}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Fill Rate</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {Math.round((classes.reduce((sum, c) => sum + (c.students / c.capacity), 0) / classes.length) * 100)}%
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Grid/List with integrated search */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Classes ({filteredClasses.length})</CardTitle>
              {/* View toggle */}
              <div className="flex gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Search and Filters inside card */}
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by class name, teacher, or subject..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
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
          </CardHeader>
          <CardContent>
            {filteredClasses.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No classes found matching your criteria
              </div>
            ) : viewMode === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClasses.map((classItem) => (
                  <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">{classItem.name}</CardTitle>
                        <Badge variant="outline" className="font-medium">{classItem.subject}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Class ID: {classItem.id}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">Class Teacher</p>
                          <p className="text-sm font-medium text-foreground">{classItem.teacher}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">Location</p>
                          <p className="text-sm font-medium text-foreground">{classItem.room}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-muted-foreground">Enrollment</p>
                            <p className="text-sm font-semibold text-foreground">
                              {classItem.students}/{classItem.capacity}
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${(classItem.students / classItem.capacity) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {classItem.capacity - classItem.students} seats available
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Class ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Subject</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Teacher</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Room</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Enrollment</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClasses.map((classItem) => (
                      <tr key={classItem.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-semibold text-foreground">{classItem.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-foreground">{classItem.name}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="font-medium">{classItem.subject}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-foreground">{classItem.teacher}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">{classItem.room}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-sm font-medium text-foreground">
                            {classItem.students}/{classItem.capacity}
                          </span>
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
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
