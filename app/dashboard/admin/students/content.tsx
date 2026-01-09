"use client"

import Link from "next/link"
import { ChevronLeft, Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function StudentPageContent() {
  const students = [
    {
      id: "S001",
      name: "John Doe",
      email: "john@school.edu",
      class: "10-A",
      status: "Active",
      joinDate: "Apr 1, 2023",
    },
    {
      id: "S002",
      name: "Jane Smith",
      email: "jane@school.edu",
      class: "10-B",
      status: "Active",
      joinDate: "Apr 1, 2023",
    },
    {
      id: "S003",
      name: "Mike Johnson",
      email: "mike@school.edu",
      class: "9-A",
      status: "Inactive",
      joinDate: "Apr 5, 2023",
    },
    {
      id: "S004",
      name: "Sarah Williams",
      email: "sarah@school.edu",
      class: "10-A",
      status: "Active",
      joinDate: "Apr 3, 2023",
    },
    { id: "S005", name: "Tom Brown", email: "tom@school.edu", class: "9-B", status: "Active", joinDate: "Apr 8, 2023" },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <Link href="/dashboard/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ChevronLeft size={20} />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={20} className="mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Students</CardTitle>
            <div className="flex items-center bg-muted px-4 py-2 rounded-lg gap-2">
              <Search size={18} className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search students..."
                className="bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Student ID</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Email</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Class</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Join Date</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-border hover:bg-muted transition">
                    <td className="p-4 font-medium">{student.id}</td>
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4 text-muted-foreground">{student.email}</td>
                    <td className="p-4">{student.class}</td>
                    <td className="p-4">
                      <Badge
                        className={`${
                          student.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        } border-0`}
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">{student.joinDate}</td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
