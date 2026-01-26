import { redirect } from "next/navigation"

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
  MapPin,
  Clock,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
} from "lucide-react"

const events = [
  {
    id: 1,
    title: "Annual Sports Day",
    type: "Sports",
    date: "Jan 30, 2026",
    time: "08:00 AM - 05:00 PM",
    location: "School Stadium",
    participants: "All Students",
    status: "Upcoming",
    description: "Annual inter-house sports competition",
    organizer: "Sports Department",
  },
  {
    id: 2,
    title: "Science Exhibition",
    type: "Academic",
    date: "Feb 05, 2026",
    time: "10:00 AM - 03:00 PM",
    location: "Main Auditorium",
    participants: "Grade 9-12",
    status: "Upcoming",
    description: "Student science projects showcase",
    organizer: "Science Department",
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    type: "Meeting",
    date: "Jan 28, 2026",
    time: "02:00 PM - 05:00 PM",
    location: "Conference Hall",
    participants: "Parents & Teachers",
    status: "Scheduled",
    description: "Quarterly academic progress review",
    organizer: "Administration",
  },
  {
    id: 4,
    title: "Music & Arts Festival",
    type: "Cultural",
    date: "Feb 15, 2026",
    time: "11:00 AM - 06:00 PM",
    location: "School Campus",
    participants: "All Students",
    status: "Planning",
    description: "Showcase of student artistic talents",
    organizer: "Arts Department",
  },
  {
    id: 5,
    title: "Career Guidance Workshop",
    type: "Workshop",
    date: "Feb 08, 2026",
    time: "09:00 AM - 12:00 PM",
    location: "Library Hall",
    participants: "Grade 11-12",
    status: "Scheduled",
    description: "University admission and career planning",
    organizer: "Counseling Department",
  },
  {
    id: 6,
    title: "Winter Vacation",
    type: "Holiday",
    date: "Dec 20, 2025 - Jan 05, 2026",
    time: "All Day",
    location: "School Closed",
    participants: "All",
    status: "Past",
    description: "Year-end winter break",
    organizer: "Administration",
  },
]

const upcomingEvents = events.filter((e) => e.status === "Upcoming" || e.status === "Scheduled")
const pastEvents = events.filter((e) => e.status === "Past")

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <AdminLayout title="Events">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Events Management</h2>
            <p className="text-muted-foreground mt-1">Organize and manage school events</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create New Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{events.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{upcomingEvents.length}</p>
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
                  <p className="text-2xl font-bold text-foreground mt-1">3</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Past Events</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{pastEvents.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Filters and Quick View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Filter Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="past">Past</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan">January</SelectItem>
                      <SelectItem value="feb">February</SelectItem>
                      <SelectItem value="mar">March</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>All Events</CardTitle>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Export Calendar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                        <Badge
                          className={
                            event.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : event.status === "Scheduled"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : event.status === "Planning"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {event.status}
                        </Badge>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{event.participants}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-muted-foreground">
                        Organized by: {event.organizer}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2 border-t sm:border-0 sm:pt-0">
                      <Button variant="ghost" size="sm" className="flex-1 sm:flex-initial">
                        <Eye className="w-4 h-4 sm:mr-0 mr-2" />
                        <span className="sm:hidden">View</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 sm:flex-initial">
                        <Edit className="w-4 h-4 sm:mr-0 mr-2" />
                        <span className="sm:hidden">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive flex-1 sm:flex-initial">
                        <Trash2 className="w-4 h-4 sm:mr-0 mr-2" />
                        <span className="sm:hidden">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
