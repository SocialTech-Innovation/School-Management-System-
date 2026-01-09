"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function StudentAttendance() {
  const attendanceData = [
    { month: "Jan", present: 18, absent: 2 },
    { month: "Feb", present: 17, absent: 1 },
    { month: "Mar", present: 19, absent: 1 },
    { month: "Apr", present: 18, absent: 2 },
    { month: "May", present: 20, absent: 0 },
    { month: "Jun", present: 19, absent: 1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Link href="/dashboard/student" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-6">My Attendance</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Overall Attendance</p>
              <p className="text-3xl font-bold">94%</p>
              <Badge className="bg-green-100 text-green-800 border-0 mt-2">Good</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Days Present</p>
              <p className="text-3xl font-bold">111</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Days Absent</p>
              <p className="text-3xl font-bold">7</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#3b82f6" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
