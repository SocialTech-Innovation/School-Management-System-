"use client"

import Link from "next/link"
import { ChevronLeft, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminClasses() {
  const classes = [
    { id: "CLASS-001", name: "10-A", teacher: "Mrs. Anderson", students: 35, capacity: 40 },
    { id: "CLASS-002", name: "10-B", teacher: "Mr. Johnson", students: 38, capacity: 40 },
    { id: "CLASS-003", name: "9-A", teacher: "Ms. Williams", students: 32, capacity: 40 },
    { id: "CLASS-004", name: "9-B", teacher: "Mr. Brown", students: 36, capacity: 40 },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <Link href="/dashboard/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ChevronLeft size={20} />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Classes Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={20} className="mr-2" />
          Create Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">{classItem.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Class ID: {classItem.id}</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Class Teacher</p>
                  <p className="text-sm font-medium">{classItem.teacher}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Students Enrolled</p>
                  <p className="text-sm font-medium">
                    {classItem.students}/{classItem.capacity}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(classItem.students / classItem.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 p-2 text-blue-600 hover:bg-blue-50 rounded transition text-sm font-medium">
                View Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
