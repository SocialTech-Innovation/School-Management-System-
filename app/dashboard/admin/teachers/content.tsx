"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Download, Filter, Edit, Trash2, Eye, Briefcase, GraduationCap, Award } from "lucide-react"

export default function TeacherPageContent() {
  const teachers = [
    { 
      id: "T001", 
      name: "Mrs. Anderson", 
      email: "anderson@school.edu", 
      subject: "Mathematics", 
      status: "Active",
      classes: "Grade 10-A, 10-B",
      experience: "15 years",
      phone: "+1 555-0201",
    },
    { 
      id: "T002", 
      name: "Mr. Johnson", 
      email: "johnson@school.edu", 
      subject: "Physics", 
      status: "Active",
      classes: "Grade 12-A, 12-B",
      experience: "12 years",
      phone: "+1 555-0202",
    },
    { 
      id: "T003", 
      name: "Ms. Williams", 
      email: "williams@school.edu", 
      subject: "English", 
      status: "Active",
      classes: "Grade 9-A, 9-B, 9-C",
      experience: "8 years",
      phone: "+1 555-0203",
    },
    { 
      id: "T004", 
      name: "Mr. Brown", 
      email: "brown@school.edu", 
      subject: "Chemistry", 
      status: "Inactive",
      classes: "Grade 11-A",
      experience: "10 years",
      phone: "+1 555-0204",
    },
  ]

  return (
    <AdminLayout title="Teachers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Teacher Management</h2>
            <p className="text-muted-foreground mt-1">Manage teaching staff and assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Teachers</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{teachers.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{teachers.filter(t => t.status === "Active").length}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inactive</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{teachers.filter(t => t.status === "Inactive").length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p className="text-2xl font-bold text-foreground mt-1">12</p>
                </div>
                <Award className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search teachers by name, subject, or ID..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Teacher ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Classes</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Experience</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-semibold text-foreground">{teacher.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-foreground">{teacher.name}</p>
                          <p className="text-xs text-muted-foreground">{teacher.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="font-medium">{teacher.subject}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-muted-foreground">{teacher.classes}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-foreground">{teacher.experience}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={`${
                            teacher.status === "Active" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {teacher.status}
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
