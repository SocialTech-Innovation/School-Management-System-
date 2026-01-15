"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calendar as CalendarIcon,
  Plus,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  GraduationCap,
  AlertCircle,
  Users,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { useState, useEffect } from "react"

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const academicEvents = [
  { date: new Date(2026, 0, 20), title: "Mid-Term Exams Begin", type: "Exam", color: "bg-red-600", location: "All Classes", participants: "All Students" },
  { date: new Date(2026, 0, 24), title: "Mathematics Olympiad", type: "Competition", color: "bg-purple-600", location: "Main Hall", participants: "Grade 9-12" },
  { date: new Date(2026, 0, 28), title: "Parent-Teacher Meeting", type: "Meeting", color: "bg-green-600", location: "Conference Hall", participants: "Parents & Teachers" },
  { date: new Date(2026, 0, 30), title: "Annual Sports Day", type: "Event", color: "bg-blue-600", location: "Stadium", participants: "All Students" },
  { date: new Date(2026, 1, 5), title: "Science Exhibition", type: "Event", color: "bg-purple-600", location: "Main Auditorium", participants: "Grade 9-12" },
  { date: new Date(2026, 1, 8), title: "Career Guidance Workshop", type: "Workshop", color: "bg-amber-600", location: "Library Hall", participants: "Grade 11-12" },
  { date: new Date(2026, 1, 14), title: "Spring Break Begins", type: "Holiday", color: "bg-gray-600", location: "School Closed", participants: "All" },
]

export default function AcademicCalendarPage() {
  useEffect(() => {
    document.title = "Academic Calendar - Skops"
  }, [])

  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1))
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDayDialogOpen, setIsDayDialogOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  
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
    return academicEvents.filter(event => 
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

  // Filter events for list view
  const filteredEvents = academicEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || event.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <AdminLayout title="Academic Calendar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Academic Calendar & Events</h2>
            <p className="text-muted-foreground mt-1">Manage academic events, terms, and important dates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Calendar
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Academic Event</DialogTitle>
                  <DialogDescription>
                    Create a new event in the academic calendar.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventTitle">Event Title *</Label>
                    <Input id="eventTitle" placeholder="Mid-Term Examinations" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exam">Exam</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="competition">Competition</SelectItem>
                          <SelectItem value="holiday">Holiday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input id="startDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input id="startTime" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input id="endTime" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input id="location" placeholder="Main Auditorium" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="participants">Participants/Audience *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="9">Grade 9</SelectItem>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                        <SelectItem value="9-12">Grade 9-12</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="teachers">Teachers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Provide event details, instructions, or additional information..." 
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Add Event
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{academicEvents.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">This term</p>
                </div>
                <CalendarIcon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                  <p className="text-2xl font-bold text-foreground mt-1">5</p>
                  <p className="text-xs text-muted-foreground mt-1">Next 30 days</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground mt-1">4</p>
                  <p className="text-xs text-muted-foreground mt-1">January</p>
                </div>
                <GraduationCap className="w-8 h-8 text-green-600" />
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
                <AlertCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                      onClick={() => {
                        setSelectedDay(day)
                        setIsDayDialogOpen(true)
                      }}
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
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Exam</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Event</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Meeting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Competition/Exhibition</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Workshop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-600 rounded"></div>
                  <span className="text-xs text-muted-foreground">Holiday</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              {/* Search and Filter inside card */}
              <div className="flex flex-col gap-3 mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search events..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Exam">Exams</SelectItem>
                    <SelectItem value="Event">Events</SelectItem>
                    <SelectItem value="Meeting">Meetings</SelectItem>
                    <SelectItem value="Workshop">Workshops</SelectItem>
                    <SelectItem value="Competition">Competitions</SelectItem>
                    <SelectItem value="Holiday">Holidays</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground text-sm">
                    No events found matching your criteria
                  </div>
                ) : (
                  filteredEvents.map((event, idx) => (
                    <div key={idx} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm text-foreground">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{event.date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{event.participants}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Day Events Dialog */}
        <Dialog open={isDayDialogOpen} onOpenChange={setIsDayDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Events for {monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {selectedDay && getEventsForDate(selectedDay).length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No events scheduled for this day</p>
                  <Button 
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setIsDayDialogOpen(false)
                      setIsAddDialogOpen(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDay && getEventsForDate(selectedDay)
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((event, idx) => (
                      <div key={idx} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">{event.title}</h4>
                              <Badge variant="outline">{event.type}</Badge>
                            </div>
                          </div>
                          <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{event.participants}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3 pt-3 border-t">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
