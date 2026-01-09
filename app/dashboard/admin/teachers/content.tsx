"use client"

import Link from "next/link"
import { ChevronLeft, Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function TeacherPageContent() {
  const teachers = [
    { id: "T001", name: "Mrs. Anderson", email: "anderson@school.edu", subject: "Mathematics", status: "Active" },
    { id: "T002", name: "Mr. Johnson", email: "johnson@school.edu", subject: "Physics", status: "Active" },
    { id: "T003", name: "Ms. Williams", email: "williams@school.edu", subject: "English", status: "Active" },
    { id: "T004", name: "Mr. Brown", email: "brown@school.edu", subject: "Chemistry", status: "Inactive" },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <Link href="/dashboard/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ChevronLeft size={20} />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Teachers Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={20} className="mr-2" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Teachers</CardTitle>
            <div className="flex items-center bg-muted px-4 py-2 rounded-lg gap-2">
              <Search size={18} className="text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search teachers..."
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
                  <th className="text-left p-4 font-semibold text-muted-foreground">Teacher ID</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Email</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Subject</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-border hover:bg-muted transition">
                    <td className="p-4 font-medium">{teacher.id}</td>
                    <td className="p-4 font-medium">{teacher.name}</td>
                    <td className="p-4 text-muted-foreground">{teacher.email}</td>
                    <td className="p-4">{teacher.subject}</td>
                    <td className="p-4">
                      <Badge
                        className={`${
                          teacher.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        } border-0`}
                      >
                        {teacher.status}
                      </Badge>
                    </td>
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
