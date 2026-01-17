"use client"

import { useEffect } from "react"
import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle,
  Briefcase,
  ArrowUpRight,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

// Mock data
const enrollmentData = [
  { month: "Jan", students: 2100 },
  { month: "Feb", students: 2180 },
  { month: "Mar", students: 2220 },
  { month: "Apr", students: 2280 },
  { month: "May", students: 2320 },
  { month: "Jun", students: 2380 },
  { month: "Jul", students: 2420 },
  { month: "Aug", students: 2456 },
]

const attendanceData = [
  { class: "Grade 9", attendance: 92, target: 95 },
  { class: "Grade 10", attendance: 96, target: 95 },
  { class: "Grade 11", attendance: 94, target: 95 },
  { class: "Grade 12", attendance: 97, target: 95 },
]

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "added a new grade for Mathematics",
    time: "2 minutes ago",
    avatar: "JD",
  },
  {
    id: 2,
    user: "Mary Smith",
    action: "enrolled a new student",
    time: "15 minutes ago",
    avatar: "MS",
  },
  {
    id: 3,
    user: "System",
    action: "generated monthly attendance report",
    time: "1 hour ago",
    avatar: "SYS",
    isSystem: true,
  },
  {
    id: 4,
    user: "David Lee",
    action: "updated class schedule for Grade 10-B",
    time: "2 hours ago",
    avatar: "DL",
  },
]

const upcomingExams = [
  {
    id: 1,
    subject: "Mathematics Mid-Term",
    class: "Grade 10",
    date: "Jan 24, 2026",
    status: "Scheduled",
  },
  {
    id: 2,
    subject: "Physics Lab Practical",
    class: "Grade 12",
    date: "Jan 25, 2026",
    status: "Scheduled",
  },
  {
    id: 3,
    subject: "English Literature",
    class: "Grade 9",
    date: "Jan 28, 2026",
    status: "Ready",
  },
]

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Low Attendance",
    message: "Grade 10-B attendance dropped below 85%",
  },
  {
    id: 2,
    type: "info",
    title: "Teacher Leave",
    message: "3 teachers have requested leave for next week",
  },
]

export default function AdminDashboard() {
  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah 👋</h1>
              <p className="text-blue-100">Here's what's happening in your school today</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <p className="text-sm text-blue-100 mb-1">Today's Date</p>
                <p className="text-lg font-semibold">January 14, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">2,456</p>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 font-semibold">+12%</span>
                <span className="text-muted-foreground ml-2">from last term</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Active Teachers</p>
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">142</p>
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground">Full staff capacity</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">48</p>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 font-semibold">+4</span>
                <span className="text-muted-foreground ml-2">this semester</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: "250ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">94.8%</p>
              <div className="flex items-center text-sm">
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-red-600 font-semibold">-0.5%</span>
                <span className="text-muted-foreground ml-2">vs yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Enrollment Trend */}
          <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Enrollment Trend</CardTitle>
                <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card">
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
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
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attendance by Class */}
          <Card className="animate-slide-up" style={{ animationDelay: "350ms" }}>
            <CardHeader>
              <CardTitle>Attendance by Class</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="class"
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[80, 100]}
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="attendance" fill="#2563EB" name="Actual" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="target" fill="#E5E7EB" name="Target" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Student
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Add New Teacher
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Create New Class
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Event
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="animate-slide-up" style={{ animationDelay: "450ms" }}>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.type === "warning"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex gap-3">
                      {alert.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-foreground">
                          {alert.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="animate-slide-up" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${
                        activity.isSystem ? "bg-gray-400" : "bg-blue-600"
                      }`}
                    >
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Examinations & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-slide-up" style={{ animationDelay: "550ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Examinations</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-3 border border-border rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {exam.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {exam.class}
                        </p>
                      </div>
                      <Badge
                        className={
                          exam.status === "Scheduled"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{exam.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Events</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "Annual Sports Day", date: "Jan 30, 2026", type: "Sports" },
                  { title: "Parent-Teacher Meeting", date: "Feb 5, 2026", type: "Meeting" },
                  { title: "Science Exhibition", date: "Feb 12, 2026", type: "Academic" },
                ].map((event, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-border rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          {event.title}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
