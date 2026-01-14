"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar as CalendarIcon,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  GraduationCap,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const calendarEvents = [
  { date: new Date(2026, 2, 5), title: "Term 2 Begins", type: "Academic", color: "bg-blue-600" },
  { date: new Date(2026, 2, 12), title: "Science Fair", type: "Event", color: "bg-purple-600" },
  { date: new Date(2026, 2, 15), title: "Parent-Teacher Meet", type: "Meeting", color: "bg-green-600" },
  { date: new Date(2026, 2, 20), title: "Mid-Term Exams Begin", type: "Exam", color: "bg-red-600" },
  { date: new Date(2026, 2, 25), title: "Spring Holiday", type: "Holiday", color: "bg-amber-600" },
  { date: new Date(2026, 3, 1), title: "Sports Day", type: "Event", color: "bg-purple-600" },
  { date: new Date(2026, 3, 10), title: "Easter Break Begins", type: "Holiday", color: "bg-amber-600" },
  { date: new Date(2026, 3, 20), title: "Easter Break Ends", type: "Holiday", color: "bg-amber-600" },
]

const upcomingEvents = [
  {
    id: 1,
    date: "March 5, 2026",
    title: "Term 2 Begins",
    type: "Academic",
    time: "08:00 AM",
    location: "School Campus",
    description: "Start of second academic term",
  },
  {
    id: 2,
    date: "March 12, 2026",
    title: "Annual Science Fair",
    type: "Event",
    time: "09:00 AM - 3:00 PM",
    location: "Main Hall",
    description: "Student science projects exhibition and competition",
  },
  {
    id: 3,
    date: "March 15, 2026",
    title: "Parent-Teacher Meeting",
    type: "Meeting",
    time: "02:00 PM - 5:00 PM",
    location: "Classrooms",
    description: "Quarterly progress discussion with parents",
  },
  {
    id: 4,
    date: "March 20, 2026",
    title: "Mid-Term Examinations Begin",
    type: "Exam",
    time: "09:00 AM",
    location: "All Classes",
    description: "Mid-term assessments across all grades",
  },
]

const academicTerms = [
  {
    term: "Term 1 - 2026",
    startDate: "January 8, 2026",
    endDate: "March 2, 2026",
    status: "Completed",
    weeks: 8,
  },
  {
    term: "Term 2 - 2026",
    startDate: "March 5, 2026",
    endDate: "May 28, 2026",
    status: "Current",
    weeks: 12,
  },
  {
    term: "Term 3 - 2026",
    startDate: "June 10, 2026",
    endDate: "August 20, 2026",
    status: "Upcoming",
    weeks: 10,
  },
]

export default function AcademicCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)) // March 2026
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getEventsForDate = (day: number) => {
    return calendarEvents.filter(event => 
      event.date.getFullYear() === currentDate.getFullYear() &&
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getDate() === day
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear()
  }

  return (
    <AdminLayout title="Academic Calendar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Academic Calendar</h2>
            <p className="text-muted-foreground mt-1">Manage academic year, terms, and important dates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Calendar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Term</p>
                  <p className="text-xl font-bold text-foreground mt-1">Term 2</p>
                  <p className="text-xs text-muted-foreground mt-1">Week 3 of 12</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                  <p className="text-2xl font-bold text-foreground mt-1">12</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
                <CalendarIcon className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Holidays</p>
                  <p className="text-2xl font-bold text-foreground mt-1">8</p>
                  <p className="text-xs text-muted-foreground mt-1">Remaining</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Working Days</p>
                  <p className="text-2xl font-bold text-foreground mt-1">180</p>
                  <p className="text-xs text-muted-foreground mt-1">Total this year</p>
                </div>
                <AlertCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Academic Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Terms 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {academicTerms.map((term) => (
                <div key={term.term} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{term.term}</h3>
                    <Badge
                      className={
                        term.status === "Current"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : term.status === "Completed"
                          ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {term.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{term.startDate} - {term.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{term.weeks} weeks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={previousMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                
                {Array.from({ length: firstDay }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
                  const events = getEventsForDate(day)
                  const today = isToday(day)
                  
                  return (
                    <div
                      key={day}
                      className={`
                        aspect-square border rounded-lg p-1 hover:bg-muted/50 transition-colors cursor-pointer
                        ${today ? "border-blue-600 border-2 bg-blue-50" : ""}
                      `}
                    >
                      <div className={`text-sm font-semibold ${today ? "text-blue-600" : "text-foreground"}`}>
                        {day}
                      </div>
                      <div className="space-y-1 mt-1">
                        {events.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`h-1 ${event.color} rounded`}
                            title={event.title}
                          ></div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{events.length - 2}</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Academic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Event</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Exam</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Holiday</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-foreground">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">{event.type}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{event.description}</p>
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
