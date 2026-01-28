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
// Importing your real API logic
import { getAllUsers, deleteUser } from "../../../../lib/api/admin" 

export default function UserManagementPage() {
  const [dbUsers, setDbUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // 1. Fetch real users from Supabase
  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await getAllUsers()
      if (data) setDbUsers(data)
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = "Users"
    loadUsers()
  }, [])

  // 2. Delete User Logic
  const handleDelete = async (userId: string) => {
    if (confirm("Chale, are you sure? This will permanently delete this user.")) {
      const success = await deleteUser(userId)
      if (success) {
        // Update local state so the row disappears immediately
        setDbUsers(prev => prev.filter(u => u.id !== userId))
      } else {
        alert("Delete failed. Check your RLS policies in Supabase.")
      }
    }
  }

  // 3. Dynamic Filter Logic
  const filteredUsers = dbUsers.filter((user) => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === "all" || user.role?.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || (user.status || 'active').toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // 4. Dynamic Role Stats
  const roleCounts = {
    admin: dbUsers.filter(u => u.role === 'admin').length,
    teacher: dbUsers.filter(u => u.role === 'teacher').length,
    student: dbUsers.filter(u => u.role === 'student').length,
    parent: dbUsers.filter(u => u.role === 'parent').length,
  }

  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
            <p className="text-muted-foreground mt-1">Manage real-time user accounts from your database</p>
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

        {/* Dynamic Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold mt-1">{loading ? "..." : dbUsers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Admins</p>
                  <p className="text-2xl font-bold mt-1">{loading ? "..." : roleCounts.admin}</p>
                </div>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Teachers</p>
                  <p className="text-2xl font-bold mt-1">{loading ? "..." : roleCounts.teacher}</p>
                </div>
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-2xl font-bold mt-1">{loading ? "..." : roleCounts.student}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Database Users ({filteredUsers.length})</CardTitle>
              
              <div className="flex gap-3 flex-wrap w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name or email..." 
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
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-muted-foreground animate-pulse">
                Fetching users from Supabase...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No users found in the database.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Email</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Role</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-right px-4 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-4">
                          <p className="font-semibold">{user.first_name} {user.last_name}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                            {user.status || 'Active'}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:bg-red-50"
                              onClick={() => handleDelete(user.id)}
                            >
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