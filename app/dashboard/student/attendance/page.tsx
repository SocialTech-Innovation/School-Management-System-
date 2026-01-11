"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { Calendar, TrendingUp, CheckCircle, XCircle, Clock as ClockIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Generate calendar data
const generateMonthData = () => {
  const days = []
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  
  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, status: null })
  }
  
  // Add days of month with random attendance status
  for (let day = 1; day <= daysInMonth; day++) {
    const isFuture = day > today.getDate()
    const statuses = ['present', 'late', 'absent']
    const status = isFuture ? null : statuses[Math.floor(Math.random() * statuses.length)]
    days.push({ day, status })
  }
  
  return days
}

const generateWeekData = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  return weekDays.map((day, index) => ({
    day,
    date: `Jan ${8 + index}`,
    status: index < 3 ? 'present' : index === 3 ? 'late' : 'absent',
    periods: [
      { subject: 'Math', status: index < 3 ? 'present' : 'absent' },
      { subject: 'Physics', status: 'present' },
      { subject: 'English', status: index === 3 ? 'late' : 'present' },
      { subject: 'History', status: 'present' },
    ]
  }))
}

const statusColors = {
  present: {
    bg: 'bg-success',
    text: 'text-success',
    light: 'bg-success-light',
    border: 'border-success',
    label: 'Present'
  },
  late: {
    bg: 'bg-warning',
    text: 'text-warning',
    light: 'bg-warning-light',
    border: 'border-warning',
    label: 'Late'
  },
  absent: {
    bg: 'bg-destructive',
    text: 'text-destructive',
    light: 'bg-destructive-foreground/10',
    border: 'border-destructive',
    label: 'Absent'
  }
}

export default function StudentAttendance() {
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week')
  const monthData = generateMonthData()
  const weekData = generateWeekData()
  
  const stats = {
    overall: 94,
    present: 111,
    late: 5,
    absent: 7,
    total: 123
  }

  return (
    <StudentLayout title="My Attendance" showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="kpi-card col-span-2 md:col-span-1">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="status-badge status-success">Good</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stats.overall}%</p>
            <p className="text-sm text-muted-foreground">Overall Rate</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stats.present}</p>
            <p className="text-sm text-muted-foreground">Present</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stats.late}</p>
            <p className="text-sm text-muted-foreground">Late</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive-foreground/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stats.absent}</p>
            <p className="text-sm text-muted-foreground">Absent</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-info-light flex items-center justify-center">
                <Calendar className="w-5 h-5 text-info" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Days</p>
          </div>
        </div>

        {/* Calendar Views */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Attendance Calendar</CardTitle>
              <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as 'week' | 'month')}>
                <TabsList>
                  <TabsTrigger value="week">Week View</TabsTrigger>
                  <TabsTrigger value="month">Month View</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week View */}
            {selectedView === 'week' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Week of Jan 8 - Jan 12, 2026</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  {weekData.map((day, index) => (
                    <div key={index} className="space-y-2">
                      {/* Day Header */}
                      <div className={`p-3 rounded-lg text-center ${
                        day.status ? statusColors[day.status as keyof typeof statusColors].light : 'bg-muted'
                      }`}>
                        <div className="font-semibold text-sm text-foreground">{day.day}</div>
                        <div className="text-xs text-muted-foreground">{day.date}</div>
                        <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                          day.status ? `${statusColors[day.status as keyof typeof statusColors].bg} text-white` : 'bg-muted text-muted-foreground'
                        }`}>
                          {day.status ? statusColors[day.status as keyof typeof statusColors].label : 'N/A'}
                        </div>
                      </div>
                      
                      {/* Period Details */}
                      <div className="space-y-1">
                        {day.periods.map((period, pIndex) => (
                          <div key={pIndex} className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${
                              period.status === 'present' ? 'bg-success' :
                              period.status === 'late' ? 'bg-warning' :
                              'bg-destructive'
                            }`} />
                            <span className="text-xs text-muted-foreground">{period.subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Month View */}
            {selectedView === 'month' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">January 2026</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day Headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Days */}
                  {monthData.map((dayData, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                        dayData.day === null
                          ? 'bg-transparent'
                          : dayData.status === null
                          ? 'bg-muted text-muted-foreground'
                          : dayData.status === 'present'
                          ? 'bg-success text-white hover:bg-success/90 cursor-pointer'
                          : dayData.status === 'late'
                          ? 'bg-warning text-white hover:bg-warning/90 cursor-pointer'
                          : 'bg-destructive text-white hover:bg-destructive/90 cursor-pointer'
                      }`}
                    >
                      {dayData.day}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-success" />
                    <span className="text-sm text-muted-foreground">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-warning" />
                    <span className="text-sm text-muted-foreground">Late</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-destructive" />
                    <span className="text-sm text-muted-foreground">Absent</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}

