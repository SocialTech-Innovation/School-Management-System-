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
import { Plus, Search, Download, Edit, Trash2, Eye, Briefcase, GraduationCap, Award } from "lucide-react"
import { useState, useEffect } from "react"

export default function TeacherPageContent() {
  useEffect(() => {
    document.title = "Teachers"
  }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)

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

  // Filter logic
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || teacher.status === statusFilter
    const matchesSubject = subjectFilter === "all" || teacher.subject === subjectFilter

    return matchesSearch && matchesStatus && matchesSubject
  })

  return (
    <AdminLayout title="Teachers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Teacher Management</h2>
            <p className="text-muted-foreground mt-1">Manage teaching staff and assignments</p>
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
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>
                    Fill in the teacher information below to add them to the system.
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
                    <Input id="email" type="email" placeholder="teacher@school.edu" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacherId">Teacher ID *</Label>
                      <Input id="teacherId" placeholder="T005" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" placeholder="+1 555-0123" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Primary Subject *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience (Years)</Label>
                      <Input id="experience" type="number" placeholder="5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Input id="qualification" placeholder="M.Sc. in Mathematics" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main Street" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Joining Date *</Label>
                      <Input id="joinDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="humanities">Humanities</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="languages">Languages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button className="w-full sm:w-auto" type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Add Teacher
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

        {/* Teachers Table with integrated search */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Teachers ({filteredTeachers.length})</CardTitle>
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
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
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
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap">Teacher ID</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Classes</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Experience</th>
                    <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-right px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-3 py-6 sm:px-4 sm:py-8 text-center text-muted-foreground">
                        No teachers found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                        <span className="font-semibold text-foreground">{teacher.id}</span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <div>
                          <p className="font-semibold text-foreground">{teacher.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[160px] sm:max-w-none">{teacher.email}</p>
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <Badge variant="outline" className="font-medium">{teacher.subject}</Badge>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <span className="text-xs sm:text-sm text-muted-foreground">{teacher.classes}</span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <span className="text-xs sm:text-sm text-foreground">{teacher.experience}</span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
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
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedTeacher(teacher)
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

        {/* View Teacher Profile Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Teacher Profile</DialogTitle>
            </DialogHeader>
            {selectedTeacher && (
              <div className="space-y-6 mt-4">
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {selectedTeacher.name.split(' ')[1] ? selectedTeacher.name.split(' ')[1].charAt(0) : selectedTeacher.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{selectedTeacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTeacher.id}</p>
                    <Badge className={`mt-1 ${selectedTeacher.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {selectedTeacher.status}
                    </Badge>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Professional Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground">{selectedTeacher.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{selectedTeacher.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Subject</p>
                      <p className="text-sm font-medium text-foreground">{selectedTeacher.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="text-sm font-medium text-foreground">{selectedTeacher.experience}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Classes Assigned</p>
                      <p className="text-sm font-medium text-foreground">{selectedTeacher.classes}</p>
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
