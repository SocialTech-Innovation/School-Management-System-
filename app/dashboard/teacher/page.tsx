"use client"

import { useEffect } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, BookOpen, CalendarDays, FileText, CheckCircle, 
  TrendingUp, Clock, Award, Bell, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const todaySchedule = [
  { id: 1, class: "Class 10-A", subject: "Mathematics", time: "08:00 - 09:00", room: "Room 201", status: "completed", attendanceMarked: true },
  { id: 2, class: "Class 9-B", subject: "Physics", time: "09:00 - 10:00", room: "Room 305", status: "current", attendanceMarked: false },
  { id: 3, class: "Class 11-C", subject: "Chemistry", time: "10:00 - 11:00", room: "Room 308", status: "upcoming", attendanceMarked: false },
  { id: 4, class: "Class 10-B", subject: "Mathematics", time: "11:00 - 12:00", room: "Room 201", status: "upcoming", attendanceMarked: false },
]

const recentActivities = [
  { id: 1, type: "grade", title: "Graded Math Quiz", description: "Class 10-A", time: "2 hours ago", icon: FileText },
  { id: 2, type: "attendance", title: "Marked Attendance", description: "Class 9-B", time: "3 hours ago", icon: CheckCircle },
  { id: 3, type: "announcement", title: "Posted Announcement", description: "Homework reminder", time: "5 hours ago", icon: Bell },
]

const quickActions = [
  { name: "Mark Attendance", href: "/dashboard/teacher/attendance", icon: CheckCircle, color: "text-success" },
  { name: "Grade Assignments", href: "/dashboard/teacher/assessment", icon: FileText, color: "text-primary" },
  { name: "View Timetable", href: "/dashboard/teacher/timetable", icon: CalendarDays, color: "text-info" },
  { name: "Manage Classes", href: "/dashboard/teacher/classes", icon: BookOpen, color: "text-warning" },
]

export default function TeacherDashboard() {
  useEffect(() => {
      document.title = "Dashboard"
    }, [])
  return (
    <TeacherLayout title="Dashboard">
      <div className="space-y-4 sm:space-y-6">
        {/* Welcome Banner */}
        <div className="gradient-welcome p-4 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
              <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg sm:text-xl">SA</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Welcome back, Prof. Sarah! 👋</h1>
                <p className="text-sm sm:text-base text-white/90 mt-1">Ready to inspire young minds today?</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-xs sm:text-sm text-white font-medium">98% Attendance Rate</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-xs sm:text-sm text-white font-medium">Top Performer This Month</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="kpi-card animate-slide-up opacity-0" style={{ animationDelay: "100ms" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="status-badge status-success">+12</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">156</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Students</p>
          </div>

          <div className="kpi-card animate-slide-up opacity-0" style={{ animationDelay: "150ms" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">6</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Classes Taught</p>
          </div>

          <div className="kpi-card animate-slide-up opacity-0" style={{ animationDelay: "200ms" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-info-light flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-info" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">4</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Today's Classes</p>
          </div>

          <div className="kpi-card animate-slide-up opacity-0" style={{ animationDelay: "250ms" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive-foreground/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">12</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Pending Grades</p>
          </div>

          <div className="kpi-card animate-slide-up opacity-0" style={{ animationDelay: "300ms" }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <span className="status-badge status-success">+2%</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">94%</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Attendance</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="animate-slide-up opacity-0" style={{ animationDelay: "350ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Today's Schedule</span>
                  <Badge variant="secondary">{todaySchedule.length} classes</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-border hover:bg-muted/30 transition-all gap-3 sm:gap-4 ${
                      item.status === "completed" && item.attendanceMarked ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.status === "completed" ? "bg-success-light" :
                        item.status === "current" ? "bg-primary-light" :
                        "bg-muted"
                      }`}>
                        <BookOpen className={`w-6 h-6 ${
                          item.status === "completed" ? "text-success" :
                          item.status === "current" ? "text-primary" :
                          "text-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <p className="text-sm sm:text-base font-semibold text-foreground">{item.class}</p>
                          {item.attendanceMarked && (
                            <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-0.5 rounded-full">
                              <Check className="w-3 h-3" />
                              <span className="text-xs font-medium">Attendance Taken</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.subject}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.time}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.room}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        item.status === "completed" ? "bg-success text-white" :
                        item.status === "current" ? "bg-primary text-white" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {item.status === "completed" ? "Completed" :
                         item.status === "current" ? "In Progress" : "Upcoming"}
                      </span>
                      {!item.attendanceMarked && item.status !== "upcoming" && (
                        <Link href={`/dashboard/teacher/attendance?class=${encodeURIComponent(item.class)}&subject=${encodeURIComponent(item.subject)}`} className="flex-1 sm:flex-initial">
                          <Button size="sm" variant="outline" className="w-full sm:w-auto flex items-center gap-1 sm:gap-2">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm">Mark Attendance</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="animate-slide-up opacity-0" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.name}
                      href={action.href}
                      className="quick-link-card"
                    >
                      <Icon className={`w-6 h-6 ${action.color}`} />
                      <span className="text-sm font-medium text-foreground text-center">{action.name}</span>
                    </Link>
                  )
                })}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="mt-6 animate-slide-up opacity-0" style={{ animationDelay: "450ms" }}>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}
