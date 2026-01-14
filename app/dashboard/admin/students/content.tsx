"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Download, Filter, Edit, Trash2, Eye, Users as UsersIcon, GraduationCap } from "lucide-react"

export default function StudentPageContent() {
  const students = [
    {
      id: "S001",
      name: "John Doe",
      email: "john@school.edu",
      class: "10-A",
      status: "Active",
      joinDate: "Apr 1, 2023",
      guardian: "Robert Doe",
      phone: "+1 555-0101",
    },
    {
      id: "S002",
      name: "Jane Smith",
      email: "jane@school.edu",
      class: "10-B",
      status: "Active",
      joinDate: "Apr 1, 2023",
      guardian: "Mary Smith",
      phone: "+1 555-0102",
    },
    {
      id: "S003",
      name: "Mike Johnson",
      email: "mike@school.edu",
      class: "9-A",
      status: "Inactive",
      joinDate: "Apr 5, 2023",
      guardian: "Lisa Johnson",
      phone: "+1 555-0103",
    },
    {
      id: "S004",
      name: "Sarah Williams",
      email: "sarah@school.edu",
      class: "10-A",
      status: "Active",
      joinDate: "Apr 3, 2023",
      guardian: "Tom Williams",
      phone: "+1 555-0104",
    },
    { 
      id: "S005", 
      name: "Tom Brown", 
      email: "tom@school.edu", 
      class: "9-B", 
      status: "Active", 
      joinDate: "Apr 8, 2023",
      guardian: "Karen Brown",
      phone: "+1 555-0105",
    },
  ]

  return (
    <AdminLayout title="Students">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Student Management</h2>
            <p className="text-muted-foreground mt-1">Manage and monitor student records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{students.length}</p>
                </div>
                <UsersIcon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{students.filter(s => s.status === "Active").length}</p>
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
                  <p className="text-2xl font-bold text-foreground mt-1">{students.filter(s => s.status === "Inactive").length}</p>
                </div>
                <UsersIcon className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                  <p className="text-2xl font-bold text-foreground mt-1">2</p>
                </div>
                <UsersIcon className="w-8 h-8 text-amber-600" />
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
                <Input placeholder="Search students by name, email, or ID..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Student ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Class</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Guardian</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-semibold text-foreground">{student.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">Joined {student.joinDate}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-muted-foreground">{student.email}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="font-medium">{student.class}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-foreground">{student.guardian}</p>
                          <p className="text-xs text-muted-foreground">{student.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={`${
                            student.status === "Active" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {student.status}
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
