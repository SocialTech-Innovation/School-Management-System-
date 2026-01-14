"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import {
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const weeklyData = [
  { day: "Mon", present: 2340, absent: 116 },
  { day: "Tue", present: 2380, absent: 76 },
  { day: "Wed", present: 2360, absent: 96 },
  { day: "Thu", present: 2400, absent: 56 },
  { day: "Fri", present: 2420, absent: 36 },
]

const classAttendance = [
  { class: "Grade 9", rate: 92 },
  { class: "Grade 10", rate: 96 },
  { class: "Grade 11", rate: 94 },
  { class: "Grade 12", rate: 97 },
]

const recentRecords = [
  { class: "Grade 10-A", date: "Jan 14, 2026", present: 43, absent: 2, late: 0, total: 45, rate: 95.6 },
  { class: "Grade 9-B", date: "Jan 14, 2026", present: 40, absent: 2, late: 1, total: 43, rate: 93.0 },
  { class: "Grade 12-C", date: "Jan 14, 2026", present: 38, absent: 0, late: 0, total: 38, rate: 100 },
  { class: "Grade 11-A", date: "Jan 14, 2026", present: 41, absent: 3, late: 1, total: 45, rate: 91.1 },
  { class: "Grade 10-C", date: "Jan 14, 2026", present: 44, absent: 1, late: 0, total: 45, rate: 97.8 },
]

export default function AttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <AdminLayout title="Attendance">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Attendance Management</h2>
            <p className="text-muted-foreground mt-1">Monitor and manage student attendance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Mark Attendance
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Rate</p>
                  <p className="text-2xl font-bold text-foreground mt-1">94.8%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-semibold">+2.1%</span>
                  </div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold text-foreground mt-1">2,328</p>
                  <p className="text-xs text-muted-foreground mt-2">of 2,456 students</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Absent Today</p>
                  <p className="text-2xl font-bold text-foreground mt-1">108</p>
                  <p className="text-xs text-muted-foreground mt-2">4.4% of total</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Late Arrivals</p>
                  <p className="text-2xl font-bold text-foreground mt-1">20</p>
                  <p className="text-xs text-muted-foreground mt-2">0.8% of total</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day"
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="present" fill="#10B981" name="Present" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Class-wise Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance by Class</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classAttendance.map((item) => (
                  <div key={item.class}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{item.class}</span>
                      <span className="text-sm font-semibold text-foreground">{item.rate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.rate >= 95 ? 'bg-green-600' : item.rate >= 90 ? 'bg-blue-600' : 'bg-amber-600'
                        }`}
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Records */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Attendance Records</CardTitle>
              <Select defaultValue="today">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Class</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Present</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Absent</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Late</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRecords.map((record, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-semibold text-foreground">{record.class}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {record.present}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          {record.absent}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          {record.late}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-medium text-foreground">{record.total}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-semibold text-foreground">{record.rate}%</span>
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
