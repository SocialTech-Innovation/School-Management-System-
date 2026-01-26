"use client"

import { useState, useEffect } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, TrendingUp, CreditCard, Calendar, 
  Clock, CheckCircle, Bell, BookOpen, MessageCircle
} from "lucide-react"
import Link from "next/link"

// Mock data for children
const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

const kpiData = {
  attendance: 94,
  averageGrade: 'A-',
  pendingFees: 450,
  upcomingEvents: 2,
}

const recentPerformance = [
  { id: '1', subject: 'Mathematics', title: 'Unit Test', date: 'Jan 10, 2026', grade: '92/100', status: 'excellent' },
  { id: '2', subject: 'Science', title: 'Project', date: 'Jan 05, 2026', grade: 'B+', status: 'good' },
  { id: '3', subject: 'English', title: 'Essay', date: 'Dec 28, 2025', grade: 'A', status: 'excellent' },
]

const teacherMessages = [
  {
    id: '1',
    teacher: 'Mrs. Anderson',
    role: 'Class Teacher',
    message: 'Alex needs to bring his signed permission slip for the museum trip by tomorrow.',
    time: '2h ago',
    unread: true,
  },
  {
    id: '2',
    teacher: 'Mr. Roberts',
    role: 'Math Teacher',
    message: 'Great improvement in the last algebra test. Keep it up!',
    time: 'Yesterday',
    unread: false,
  },
]

const todaySchedule = [
  { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Roberts' },
  { time: '10:00 AM', subject: 'History', teacher: 'Mr. Thompson' },
  { time: '11:30 AM', subject: 'Physics', teacher: 'Dr. Williams' },
  { time: '01:00 PM', subject: 'Lunch Break', teacher: '' },
  { time: '02:00 PM', subject: 'English', teacher: 'Mrs. Anderson' },
]

export default function ParentDashboard() {
  useEffect(() => {
      document.title = "Dashboard"
    }, [])
  const [selectedChild, setSelectedChild] = useState(childrenData[0])

  return (
    <ParentLayout title="Dashboard" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-4 sm:space-y-6">
        {/* Child Overview Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground animate-slide-up">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{selectedChild.name}</h2>
                <p className="text-sm sm:text-base text-primary-foreground/90 mt-1">
                  Class {selectedChild.class} • Roll No: {selectedChild.rollNo}
                </p>
                <p className="text-primary-foreground/80 text-sm mt-2">Academic Year: 2025-2026</p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl sm:text-4xl font-bold">
                {selectedChild.name.charAt(0)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert Banner */}
        {kpiData.pendingFees > 0 && (
          <Card className="border-warning bg-warning/10 animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base font-medium text-foreground">Payment Due</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Term 2 fees of ${kpiData.pendingFees} are pending. Please clear by Jan 30th.
                  </p>
                </div>
              </div>
              <Link href="/dashboard/parent/fees" className="w-full sm:w-auto">
                <Button variant="default" className="w-full sm:w-auto" size="sm">Pay Now</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Overall Attendance</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{kpiData.attendance}%</p>
                  <Badge className="bg-success text-white mt-2">Good</Badge>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Average Grade</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{kpiData.averageGrade}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">88%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <TrendingUp size={24} className="text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pending Fees</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">${kpiData.pendingFees}</p>
                  <Badge className="bg-warning text-white mt-2">Due Soon</Badge>
                </div>
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <CreditCard size={24} className="text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Upcoming Events</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{kpiData.upcomingEvents}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">This week</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Calendar size={24} className="text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Performance */}
            <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Performance</CardTitle>
                  <Link href="/dashboard/parent/performance" className="text-primary hover:text-primary/80 text-sm font-medium">
                    View all
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPerformance.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                        item.subject === 'Mathematics' ? 'bg-blue-500' :
                        item.subject === 'Science' ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {item.subject.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.subject} • {item.date}</p>
                      </div>
                      <Badge className={
                        item.status === 'excellent' ? 'bg-success text-white' : 'bg-info text-white'
                      }>
                        {item.grade}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card className="animate-slide-up" style={{ animationDelay: "350ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition">
                      <div className="w-20 text-sm font-medium text-muted-foreground">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.subject}</p>
                        {item.teacher && (
                          <p className="text-sm text-muted-foreground">{item.teacher}</p>
                        )}
                      </div>
                      {item.teacher && (
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1 column */}
          <div className="space-y-6">
            {/* Teacher Messages */}
            <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Teacher Messages
                  </CardTitle>
                  <Link href="/dashboard/parent/messages" className="text-primary hover:text-primary/80 text-sm font-medium">
                    View all
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherMessages.map((msg) => (
                    <div key={msg.id} className={`p-3 rounded-lg border ${
                      msg.unread ? 'bg-primary/5 border-primary/20' : 'bg-muted/50 border-transparent'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{msg.teacher}</p>
                          <p className="text-xs text-muted-foreground">{msg.role}</p>
                        </div>
                        {msg.unread && (
                          <Badge className="bg-primary text-white">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-slide-up" style={{ animationDelay: "450ms" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/dashboard/parent/attendance">
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      View Attendance
                    </Button>
                  </Link>
                  <Link href="/dashboard/parent/fees">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Fees
                    </Button>
                  </Link>
                  <Link href="/dashboard/parent/timetable">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Timetable
                    </Button>
                  </Link>
                  <Link href="/dashboard/parent/announcements">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Announcements
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ParentLayout>
  )
}
