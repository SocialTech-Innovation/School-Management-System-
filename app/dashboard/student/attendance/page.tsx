"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { Calendar, TrendingUp, CheckCircle, XCircle, Clock as ClockIcon, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample period schedule
const periodSchedule = [
  { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Anderson', room: '201' },
  { time: '09:00 - 10:00', subject: 'Physics', teacher: 'Ms. Curie', room: '305' },
  { time: '10:00 - 11:00', subject: 'English', teacher: 'Mrs. Woolf', room: '102' },
  { time: '11:00 - 12:00', subject: 'Chemistry', teacher: 'Dr. Mendeleev', room: '308' },
  { time: '12:00 - 01:00', subject: 'Lunch Break', teacher: '', room: '' },
  { time: '01:00 - 02:00', subject: 'History', teacher: 'Mr. Churchill', room: '205' },
  { time: '02:00 - 03:00', subject: 'Computer Science', teacher: 'Mr. Gates', room: '401' },
]

// Generate calendar data with periods
const generateMonthData = (monthOffset: number = 0) => {
  const days = []
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() - monthOffset
  
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, status: null, date: null, periods: [] })
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day)
    const dayOfWeek = currentDate.getDay()
    const isFuture = monthOffset === 0 && day > today.getDate()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    if (isWeekend || isFuture) {
      days.push({ day, status: null, date: currentDate, periods: [] })
    } else {
      const statuses = ['present', 'late', 'absent']
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const periods = periodSchedule.filter(p => p.subject !== 'Lunch Break').map(p => ({
        ...p,
        status: Math.random() > 0.15 ? 'present' : (Math.random() > 0.5 ? 'late' : 'absent')
      }))
      days.push({ day, status, date: currentDate, periods })
    }
  }
  
  return days
}

const generateWeekData = (weekOffset: number = 0) => {
  const today = new Date()
  const currentWeekStart = new Date(today)
  currentWeekStart.setDate(today.getDate() - today.getDay() + 1 - (weekOffset * 7))
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  return weekDays.map((day, index) => {
    const date = new Date(currentWeekStart)
    date.setDate(currentWeekStart.getDate() + index)
    
    const isFuture = weekOffset === 0 && date > today
    
    if (isFuture) {
      return {
        day,
        date: `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`,
        fullDate: date,
        status: null,
        periods: []
      }
    }
    
    const periods = periodSchedule.filter(p => p.subject !== 'Lunch Break').map(period => ({
      ...period,
      status: Math.random() > 0.15 ? 'present' : (Math.random() > 0.5 ? 'late' : 'absent')
    }))
    
    const statusCounts = periods.reduce((acc, p) => {
      acc[p.status as keyof typeof acc]++
      return acc
    }, { present: 0, late: 0, absent: 0 })
    
    const overallStatus = statusCounts.absent > 2 ? 'absent' : 
                          statusCounts.late > 2 ? 'late' : 'present'
    
    return {
      day,
      date: `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`,
      fullDate: date,
      status: overallStatus,
      periods
    }
  })
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
  useEffect(() => {
      document.title = "Attendance"
    }, [])
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week')
  const [weekOffset, setWeekOffset] = useState(0)
  const [monthOffset, setMonthOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState<any>(null)
  
  const monthData = generateMonthData(monthOffset)
  const weekData = generateWeekData(weekOffset)
  
  const stats = {
    overall: 94,
    present: 111,
    late: 5,
    absent: 7,
    total: 123
  }

  const getMonthName = (offset: number) => {
    const today = new Date()
    const month = today.getMonth() - offset
    const date = new Date(today.getFullYear(), month, 1)
    return date.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  const getWeekRange = (offset: number) => {
    const today = new Date()
    const currentWeekStart = new Date(today)
    currentWeekStart.setDate(today.getDate() - today.getDay() + 1 - (offset * 7))
    const weekEnd = new Date(currentWeekStart)
    weekEnd.setDate(currentWeekStart.getDate() + 4)
    
    return `${currentWeekStart.toLocaleString('default', { month: 'short' })} ${currentWeekStart.getDate()} - ${weekEnd.toLocaleString('default', { month: 'short' })} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`
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
                  <h3 className="font-semibold text-foreground">{getWeekRange(weekOffset)}</h3>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setWeekOffset(weekOffset + 1)}
                      disabled={weekOffset >= 2}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled
                      className="w-full sm:w-auto opacity-50 cursor-not-allowed"
                    >
                      Current Week
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {weekData.map((day, index) => (
                    <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            day.status ? statusColors[day.status as keyof typeof statusColors].light : 'bg-muted'
                          }`}>
                            <span className="font-bold text-foreground">{day.day}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{day.date}</p>
                            <p className="text-xs text-muted-foreground">{day.periods.length} classes</p>
                          </div>
                        </div>
                        {day.status && (
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[day.status as keyof typeof statusColors].bg} text-white`}>
                            {statusColors[day.status as keyof typeof statusColors].label}
                          </span>
                        )}
                      </div>
                      
                      {/* Period Details */}
                      <div className="space-y-2">
                        {day.periods.length > 0 ? (
                          day.periods.map((period, pIndex) => (
                            <div key={pIndex} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  period.status === 'present' ? 'bg-success-light' :
                                  period.status === 'late' ? 'bg-warning-light' :
                                  'bg-destructive-foreground/10'
                                }`}>
                                  {period.status === 'present' ? (
                                    <CheckCircle className="w-4 h-4 text-success" />
                                  ) : period.status === 'late' ? (
                                    <ClockIcon className="w-4 h-4 text-warning" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-destructive" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{period.subject}</p>
                                  <p className="text-xs text-muted-foreground">{period.time} • {period.teacher}</p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                period.status === 'present' ? 'bg-success text-white' :
                                period.status === 'late' ? 'bg-warning text-white' :
                                'bg-destructive text-white'
                              }`}>
                                {period.status === 'present' ? 'Present' : period.status === 'late' ? 'Late' : 'Absent'}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground text-center py-2">No classes scheduled</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Month View */}
            {selectedView === 'month' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{getMonthName(monthOffset)}</h3>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setMonthOffset(monthOffset + 1)}
                        disabled={monthOffset >= 2}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled
                        className="w-full sm:w-auto opacity-50 cursor-not-allowed"
                      >
                        Current Month
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
                    {monthData.map((dayData, index) => {
                      const isWeekday = dayData.date && dayData.date.getDay() !== 0 && dayData.date.getDay() !== 6
                      return (
                        <button
                          key={index}
                          onClick={() => isWeekday && dayData.periods.length > 0 ? setSelectedDay(dayData) : null}
                          disabled={!isWeekday || dayData.periods.length === 0}
                          className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                            dayData.day === null
                              ? 'bg-transparent cursor-default'
                              : !isWeekday || dayData.status === null
                              ? 'bg-muted text-muted-foreground cursor-default'
                              : dayData.status === 'present'
                              ? 'bg-success text-white hover:bg-success/90 cursor-pointer hover:scale-105'
                              : dayData.status === 'late'
                              ? 'bg-warning text-white hover:bg-warning/90 cursor-pointer hover:scale-105'
                              : 'bg-destructive text-white hover:bg-destructive/90 cursor-pointer hover:scale-105'
                          } ${selectedDay?.day === dayData.day && selectedDay?.date?.getMonth() === dayData.date?.getMonth() ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                        >
                          {dayData.day}
                        </button>
                      )
                    })}
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

                {/* Day Details Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Day Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedDay && selectedDay.periods.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-semibold text-foreground">
                                {selectedDay.date.toLocaleDateString('default', { weekday: 'long' })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {selectedDay.date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              selectedDay.status ? `${statusColors[selectedDay.status as keyof typeof statusColors].bg} text-white` : 'bg-muted text-muted-foreground'
                            }`}>
                              {selectedDay.status ? statusColors[selectedDay.status as keyof typeof statusColors].label : 'N/A'}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {selectedDay.periods.map((period: any, idx: number) => (
                              <div key={idx} className="p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center ${
                                      period.status === 'present' ? 'bg-success' :
                                      period.status === 'late' ? 'bg-warning' :
                                      'bg-destructive'
                                    }`}>
                                      {period.status === 'present' ? (
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      ) : period.status === 'late' ? (
                                        <ClockIcon className="w-3 h-3 text-white" />
                                      ) : (
                                        <XCircle className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{period.subject}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">{period.time}</p>
                                <p className="text-xs text-muted-foreground">{period.teacher} • Room {period.room}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">
                            Click on a weekday to view attendance details
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}

