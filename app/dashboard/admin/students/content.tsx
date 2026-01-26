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
import { Plus, Search, Download, Edit, Trash2, Eye, Users as UsersIcon, GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"

export default function StudentPageContent() {
  useEffect(() => {
    document.title = "Students"
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

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

  // Filter logic
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesClass = classFilter === "all" || student.class === classFilter

    return matchesSearch && matchesStatus && matchesClass
  })

  return (
    <AdminLayout title="Students">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Student Management</h2>
            <p className="text-muted-foreground mt-1">Manage and monitor student records</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Fill in the student information below to add them to the system.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="profilePic">Profile Picture</Label>
                    <Input id="profilePic" type="file" accept="image/*" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="student@school.edu" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID *</Label>
                      <Input id="studentId" placeholder="S006" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class">Class *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-a">9-A</SelectItem>
                          <SelectItem value="9-b">9-B</SelectItem>
                          <SelectItem value="10-a">10-A</SelectItem>
                          <SelectItem value="10-b">10-B</SelectItem>
                          <SelectItem value="11-a">11-A</SelectItem>
                          <SelectItem value="12-a">12-A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input id="dob" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1 555-0123" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main Street" />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-semibold mb-3">Guardian Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guardianName">Guardian Name *</Label>
                        <Input id="guardianName" placeholder="Robert Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                        <Input id="guardianPhone" type="tel" placeholder="+1 555-0101" required />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="guardianEmail">Guardian Email</Label>
                      <Input id="guardianEmail" type="email" placeholder="parent@email.com" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button className="w-full sm:w-auto" type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Add Student
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

        {/* Students Table with integrated search */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Students ({filteredStudents.length})</CardTitle>
            </div>
            {/* Search and Filters inside card */}
            <div className="flex flex-col md:flex-row gap-3 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email, or ID..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="9-A">9-A</SelectItem>
                  <SelectItem value="9-B">9-B</SelectItem>
                  <SelectItem value="10-A">10-A</SelectItem>
                  <SelectItem value="10-B">10-B</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap">Student ID</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap">Email</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Class</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Guardian</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-3 py-6 sm:px-4 sm:py-8 text-center text-muted-foreground">
                        No students found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                          <span className="font-semibold text-foreground">{student.id}</span>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-4">
                          <div>
                            <p className="font-semibold text-foreground">{student.name}</p>
                            <p className="text-xs text-muted-foreground">Joined {student.joinDate}</p>
                          </div>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm text-muted-foreground truncate max-w-[160px] sm:max-w-none inline-block">{student.email}</span>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-4">
                          <Badge variant="outline" className="font-medium">{student.class}</Badge>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-4">
                          <div>
                            <p className="text-xs sm:text-sm text-foreground">{student.guardian}</p>
                            <p className="text-xs text-muted-foreground">{student.phone}</p>
                          </div>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-4">
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
                        <td className="px-3 py-2 sm:px-4 sm:py-4">
                          <div className="flex items-center justify-end gap-1 sm:gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedStudent(student)
                                setIsViewDialogOpen(true)
                              }}
                            >
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* View Student Profile Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6 mt-4">
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{selectedStudent.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedStudent.id}</p>
                    <Badge className={`mt-1 ${selectedStudent.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {selectedStudent.status}
                    </Badge>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{selectedStudent.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Class</p>
                      <p className="text-sm font-medium text-foreground">{selectedStudent.class}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Join Date</p>
                      <p className="text-sm font-medium text-foreground">{selectedStudent.joinDate}</p>
                    </div>
                  </div>
                </div>

                {/* Guardian Information */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Guardian Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Guardian Name</p>
                      <p className="text-sm font-medium text-foreground">{selectedStudent.guardian}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Guardian Phone</p>
                      <p className="text-sm font-medium text-foreground">{selectedStudent.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
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
