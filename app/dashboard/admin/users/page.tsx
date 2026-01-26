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
  Users,
  Plus,
  Search,
  Filter,
  Shield,
  Edit,
  Trash2,
  Key,
  Lock,
  Mail,
  UserCheck,
  UserX,
} from "lucide-react"
import { useState, useEffect } from "react"

const users = [
  {
    id: 1,
    name: "John Administrator",
    email: "john.admin@school.edu",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
    department: "Administration",
    permissions: ["Full Access"],
  },
  {
    id: 2,
    name: "Mrs. Anderson",
    email: "anderson@school.edu",
    role: "Teacher",
    status: "Active",
    lastLogin: "5 minutes ago",
    department: "Mathematics",
    permissions: ["Grade Entry", "Attendance", "Reports"],
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah@school.edu",
    role: "Student",
    status: "Active",
    lastLogin: "1 hour ago",
    department: "Grade 10-A",
    permissions: ["View Grades", "View Attendance"],
  },
  {
    id: 4,
    name: "Robert Doe",
    email: "robert.doe@parent.edu",
    role: "Parent",
    status: "Active",
    lastLogin: "3 hours ago",
    department: "Parent Portal",
    permissions: ["View Child Records", "Communication"],
  },
  {
    id: 5,
    name: "Mike Johnson",
    email: "mike@school.edu",
    role: "Teacher",
    status: "Inactive",
    lastLogin: "2 days ago",
    department: "Physics",
    permissions: ["Grade Entry", "Attendance"],
  },
]

const roles = [
  {
    name: "Admin",
    color: "bg-red-100 text-red-800",
    count: 3,
    permissions: ["Full System Access", "User Management", "Settings"],
  },
  {
    name: "Teacher",
    color: "bg-purple-100 text-purple-800",
    count: 24,
    permissions: ["Grade Entry", "Attendance", "Class Management"],
  },
  {
    name: "Student",
    color: "bg-blue-100 text-blue-800",
    count: 406,
    permissions: ["View Grades", "View Attendance", "Assignments"],
  },
  {
    name: "Parent",
    color: "bg-green-100 text-green-800",
    count: 312,
    permissions: ["View Child Records", "Communication", "Fee Payment"],
  },
]

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    document.title = "Users"
  }, [])

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
            <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <Shield className="w-4 h-4 mr-2" />
              Manage Roles
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{users.filter(u => u.status === "Active").length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Inactive Users</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{users.filter(u => u.status === "Inactive").length}</p>
                </div>
                <UserX className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">User Roles</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{roles.length}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles Overview */}
        <Card>
          <CardHeader>
            <CardTitle>User Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {roles.map((role) => (
                <div key={role.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${role.color} hover:${role.color}`}>{role.name}</Badge>
                    <span className="text-2xl font-bold text-foreground">{role.count}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Permissions:</p>
                    {role.permissions.map((perm, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-blue-600"></span>
                        {perm}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
              
              {/* Search and Filters inside card */}
              <div className="flex gap-3 flex-wrap w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No users found matching your criteria
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">User</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap">Email</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Role</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Department</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap">Last Login</th>
                      <th className="text-right px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.permissions.slice(0, 2).join(", ")}</p>
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 min-w-0">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs sm:text-sm text-muted-foreground truncate max-w-[160px] sm:max-w-none">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <Badge
                          className={
                            user.role === "Admin"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : user.role === "Teacher"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                              : user.role === "Student"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <span className="text-xs sm:text-sm text-foreground">{user.department}</span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <Badge
                          className={
                            user.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm text-muted-foreground">{user.lastLogin}</span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <Button variant="ghost" size="sm" title="Reset Password">
                            <Key className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Permissions">
                            <Lock className="w-4 h-4" />
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
