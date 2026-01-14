"use client"

import { useState } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { Calendar, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

const attendanceStats = {
  percentage: 94,
  present: 85,
  absent: 5,
  late: 2,
  totalDays: 92,
  classAverage: 91,
}

const recentAbsences = [
  { date: "Jan 14, 2026", reason: "Pending", status: "unexcused" },
  { date: "Dec 28, 2025", reason: "Medical - Doctor appointment", status: "excused" },
  { date: "Dec 15, 2025", reason: "Family emergency", status: "excused" },
]

const monthlyHistory = [
  { month: "January", present: 18, absent: 2, percentage: 90 },
  { month: "December", present: 21, absent: 2, percentage: 91 },
  { month: "November", present: 20, absent: 1, percentage: 95 },
  { month: "October", present: 15, absent: 0, percentage: 100 },
  { month: "September", present: 19, absent: 1, percentage: 95 },
  { month: "August", present: 17, absent: 1, percentage: 94 },
]

const attendancePieData = [
  { name: "Present", value: attendanceStats.present, color: "hsl(var(--success))" },
  { name: "Absent", value: attendanceStats.absent, color: "hsl(var(--destructive))" },
  { name: "Late", value: attendanceStats.late, color: "hsl(var(--warning))" },
]

// Calendar mock data
const presentDates = [
  new Date(2026, 0, 6),
  new Date(2026, 0, 7),
  new Date(2026, 0, 8),
  new Date(2026, 0, 9),
  new Date(2026, 0, 10),
  new Date(2026, 0, 13),
]
const absentDates = [new Date(2026, 0, 14)]
const lateDates = [new Date(2026, 0, 3)]

// Detailed attendance data for each date
const dateAttendanceDetails: Record<string, { present: number; absent: number; late: number; subjects: Array<{ name: string; status: 'present' | 'absent' | 'late'; time: string }> }> = {
  '2026-01-02': {
    present: 0,
    absent: 0,
    late: 0,
    subjects: [],
  },
  '2026-01-03': {
    present: 5,
    absent: 0,
    late: 2,
    subjects: [
      { name: 'Mathematics', status: 'present', time: '8:00 AM' },
      { name: 'Physics', status: 'present', time: '9:00 AM' },
      { name: 'Chemistry', status: 'present', time: '10:00 AM' },
      { name: 'English', status: 'present', time: '11:00 AM' },
      { name: 'History', status: 'present', time: '12:00 PM' },
      { name: 'Computer Science', status: 'late', time: '2:00 PM' },
      { name: 'Physical Education', status: 'late', time: '3:00 PM' },
    ],
  },
  '2026-01-06': {
    present: 7,
    absent: 0,
    late: 0,
    subjects: [
      { name: 'Mathematics', status: 'present', time: '8:00 AM' },
      { name: 'Physics', status: 'present', time: '9:00 AM' },
      { name: 'Chemistry', status: 'present', time: '10:00 AM' },
      { name: 'English', status: 'present', time: '11:00 AM' },
      { name: 'History', status: 'present', time: '12:00 PM' },
      { name: 'Computer Science', status: 'present', time: '2:00 PM' },
      { name: 'Physical Education', status: 'present', time: '3:00 PM' },
    ],
  },
  '2026-01-07': {
    present: 6,
    absent: 1,
    late: 0,
    subjects: [
      { name: 'Mathematics', status: 'present', time: '8:00 AM' },
      { name: 'Physics', status: 'present', time: '9:00 AM' },
      { name: 'Chemistry', status: 'absent', time: '10:00 AM' },
      { name: 'English', status: 'present', time: '11:00 AM' },
      { name: 'Biology', status: 'present', time: '12:00 PM' },
      { name: 'Computer Science', status: 'present', time: '2:00 PM' },
      { name: 'Art', status: 'present', time: '3:00 PM' },
    ],
  },
  '2026-01-08': {
    present: 7,
    absent: 0,
    late: 0,
    subjects: [
      { name: 'Mathematics', status: 'present', time: '8:00 AM' },
      { name: 'Physics', status: 'present', time: '9:00 AM' },
      { name: 'Chemistry', status: 'present', time: '10:00 AM' },
      { name: 'English', status: 'present', time: '11:00 AM' },
      { name: 'History', status: 'present', time: '12:00 PM' },
      { name: 'Computer Science', status: 'present', time: '2:00 PM' },
      { name: 'Physical Education', status: 'present', time: '3:00 PM' },
    ],
  },
  '2026-01-09': {
    present: 6,
    absent: 0,
    late: 1,
    subjects: [
      { name: 'Mathematics', status: 'present', time: '8:00 AM' },
      { name: 'Physics', status: 'late', time: '9:00 AM' },
      { name: 'Chemistry', status: 'present', time: '10:00 AM' },
      { name: 'English', status: 'present', time: '11:00 AM' },
      { name: 'Biology', status: 'present', time: '12:00 PM' },
      { name: 'Computer Science', status: 'present', time: '2:00 PM' },
      { name: 'Art', status: 'present', time: '3:00 PM' },
    ],
  },
  '2026-01-10': {
    present: 7,
    absent: 0,
    late: 0,
    subjects: [
      { name: 'Mathematics', status: 'present', time: '8:00 AM' },
      { name: 'Physics', status: 'present', time: '9:00 AM' },
      { name: 'Chemistry', status: 'present', time: '10:00 AM' },
      { name: 'English', status: 'present', time: '11:00 AM' },
      { name: 'History', status: 'present', time: '12:00 PM' },
      { name: 'Computer Science', status: 'present', time: '2:00 PM' },
      { name: 'Physical Education', status: 'present', time: '3:00 PM' },
    ],
  },
  '2026-01-13': {
    present: 7,
    absent: 0,
    late: 0,
    subjects: [
      { name: 'Mathematics', status: 'present', time: '8:00 AM' },
      { name: 'Physics', status: 'present', time: '9:00 AM' },
      { name: 'Chemistry', status: 'present', time: '10:00 AM' },
      { name: 'English', status: 'present', time: '11:00 AM' },
      { name: 'History', status: 'present', time: '12:00 PM' },
      { name: 'Computer Science', status: 'present', time: '2:00 PM' },
      { name: 'Physical Education', status: 'present', time: '3:00 PM' },
    ],
  },
  '2026-01-14': {
    present: 0,
    absent: 7,
    late: 0,
    subjects: [
      { name: 'Mathematics', status: 'absent', time: '8:00 AM' },
      { name: 'Physics', status: 'absent', time: '9:00 AM' },
      { name: 'Chemistry', status: 'absent', time: '10:00 AM' },
      { name: 'English', status: 'absent', time: '11:00 AM' },
      { name: 'Biology', status: 'absent', time: '12:00 PM' },
      { name: 'Computer Science', status: 'absent', time: '2:00 PM' },
      { name: 'Art', status: 'absent', time: '3:00 PM' },
    ],
  },
}

export default function AttendancePage() {
  const [selectedChild, setSelectedChild] = useState(childrenData[0])
  const [date, setDate] = useState<Date | undefined>(new Date())

  const modifiers = {
    present: presentDates,
    absent: absentDates,
    late: lateDates,
  }

  const modifiersStyles = {
    present: { backgroundColor: 'hsl(var(--success) / 0.2)', color: 'hsl(var(--success))', fontWeight: 'bold' },
    absent: { backgroundColor: 'hsl(var(--destructive) / 0.2)', color: 'hsl(var(--destructive))', fontWeight: 'bold' },
    late: { backgroundColor: 'hsl(var(--warning) / 0.2)', color: 'hsl(var(--warning))', fontWeight: 'bold' },
  }

  return (
    <ParentLayout title="Attendance Monitoring" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="lg:col-span-1 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground animate-slide-up">
            <CardContent className="pt-6 text-center">
              <p className="text-4xl font-bold">{attendanceStats.percentage}%</p>
              <p className="text-primary-foreground/80 mt-1">Attendance Rate</p>
              <Badge className="mt-3 bg-white/20 text-white border-0">Excellent</Badge>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle size={24} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.present}</p>
                <p className="text-sm text-muted-foreground">Days Present</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <XCircle size={24} className="text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.absent}</p>
                <p className="text-sm text-muted-foreground">Days Absent</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.late}</p>
                <p className="text-sm text-muted-foreground">Days Late</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                <TrendingUp size={24} className="text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.classAverage}%</p>
                <p className="text-sm text-muted-foreground">Class Average</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Bar Chart */}
          <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "250ms" }}>
            <CardHeader>
              <CardTitle>Monthly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month"
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="present" fill="hsl(var(--success))" name="Present" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle>Attendance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendancePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendancePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View with Details */}
          <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "350ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Attendance Calendar - January 2026
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Calendar */}
                <div>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    className="rounded-md border"
                  />
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-success/20"></div>
                      <span className="text-sm text-muted-foreground">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-destructive/20"></div>
                      <span className="text-sm text-muted-foreground">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-warning/20"></div>
                      <span className="text-sm text-muted-foreground">Late</span>
                    </div>
                  </div>
                </div>

                {/* Right: Selected Date Details */}
                <div>
                  {date && (() => {
                    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                    const details = dateAttendanceDetails[dateKey]
                    if (!details || details.subjects.length === 0) {
                      return (
                        <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-border rounded-lg">
                          <p className="text-sm text-muted-foreground text-center">
                            Select a date to view detailed attendance
                          </p>
                        </div>
                      )
                    }

                    return (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-foreground mb-3">
                          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </h4>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="text-center p-2 rounded bg-success/10">
                            <p className="text-xl font-bold text-success">{details.present}</p>
                            <p className="text-xs text-muted-foreground">Present</p>
                          </div>
                          <div className="text-center p-2 rounded bg-destructive/10">
                            <p className="text-xl font-bold text-destructive">{details.absent}</p>
                            <p className="text-xs text-muted-foreground">Absent</p>
                          </div>
                          <div className="text-center p-2 rounded bg-warning/10">
                            <p className="text-xl font-bold text-warning">{details.late}</p>
                            <p className="text-xs text-muted-foreground">Late</p>
                          </div>
                        </div>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                          <p className="text-sm font-semibold text-foreground mb-2">Class-wise Attendance:</p>
                          {details.subjects.map((subject, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 px-3 rounded bg-background/50">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  subject.status === 'present' ? 'bg-success' :
                                  subject.status === 'absent' ? 'bg-destructive' : 'bg-warning'
                                }`} />
                                <span className="text-sm font-medium text-foreground">{subject.name}</span>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <span className="text-xs text-muted-foreground">{subject.time}</span>
                                <Badge className={`text-xs ${
                                  subject.status === 'present' ? 'bg-success text-white' :
                                  subject.status === 'absent' ? 'bg-destructive text-white' : 'bg-warning text-white'
                                }`}>
                                  {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Absences */}
          <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Recent Absences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAbsences.map((absence, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground text-sm">{absence.date}</p>
                      <Badge
                        className={
                          absence.status === "excused"
                            ? "bg-success text-white"
                            : "bg-destructive text-white"
                        }
                      >
                        {absence.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{absence.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Summary */}
        <Card className="animate-slide-up" style={{ animationDelay: "450ms" }}>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-3xl font-bold text-primary">{attendanceStats.totalDays}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Working Days</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-success/10">
                <p className="text-3xl font-bold text-success">{attendanceStats.present}</p>
                <p className="text-sm text-muted-foreground mt-1">Present</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-destructive/10">
                <p className="text-3xl font-bold text-destructive">{attendanceStats.absent}</p>
                <p className="text-sm text-muted-foreground mt-1">Absent</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-warning/10">
                <p className="text-3xl font-bold text-warning">{attendanceStats.late}</p>
                <p className="text-sm text-muted-foreground mt-1">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  )
}
