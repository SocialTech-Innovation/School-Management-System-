"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Bell, Calendar, Info, Megaphone } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "Important: School Closure Notice",
    content:
      "School will close early on Friday, March 15th for staff development. Dismissal will be at 12:00 PM. Please arrange for early pickup.",
    date: "Today, 9:00 AM",
    category: "Important",
    isUrgent: true,
  },
  {
    id: 2,
    title: "Science Fair Registration Open",
    content:
      "Registration for the annual science fair is now open. Submit your project proposals by March 30th. This year's theme is 'Innovation for Sustainability'. Teams of up to 3 students are allowed.",
    date: "Yesterday",
    category: "Events",
    isUrgent: false,
  },
  {
    id: 3,
    title: "Parent-Teacher Conference Schedule",
    content:
      "The parent-teacher conferences will be held on March 20th and 21st. Please book your time slots through the parent portal. Each session will be 15 minutes long.",
    date: "Jan 28, 2026",
    category: "General",
    isUrgent: false,
  },
  {
    id: 4,
    title: "Library Book Return Reminder",
    content:
      "All library books borrowed for the first term must be returned by March 31st. Late returns will incur a fine of $0.50 per day per book.",
    date: "Jan 27, 2026",
    category: "Reminder",
    isUrgent: false,
  },
  {
    id: 5,
    title: "Sports Day Announcement",
    content:
      "Annual Sports Day will be held on April 15th. All students are encouraged to participate. Practice sessions start next week. Sign up with your PE teacher.",
    date: "Jan 25, 2026",
    category: "Events",
    isUrgent: false,
  },
  {
    id: 6,
    title: "Winter Uniform Transition",
    content:
      "Students should transition to winter uniforms starting March 1st. Ensure you have the proper winter attire including blazers and full-length trousers/skirts.",
    date: "Jan 24, 2026",
    category: "General",
    isUrgent: false,
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  Important: <AlertTriangle className="w-5 h-5" />,
  Events: <Calendar className="w-5 h-5" />,
  General: <Info className="w-5 h-5" />,
  Reminder: <Bell className="w-5 h-5" />,
}

const categoryStyles: Record<string, string> = {
  Important: "bg-destructive-foreground/10 text-destructive border-destructive/30",
  Events: "bg-info-light text-info border-info/30",
  General: "bg-muted text-muted-foreground border-border",
  Reminder: "bg-warning-light text-warning border-warning/30",
}

export default function StudentAnnouncements() {
  useEffect(() => {
      document.title = "Announcements"
    }, [])
  const [filter, setFilter] = useState("all")

  const filteredAnnouncements =
    filter === "all" ? announcements : announcements.filter((a) => a.category.toLowerCase() === filter)

  return (
    <StudentLayout title="Announcements" showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">School Announcements</h2>
              <p className="text-muted-foreground">Stay updated with the latest news</p>
            </div>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="reminder">Reminder</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`p-6 border-l-4 ${
                announcement.isUrgent ? "border-l-destructive bg-destructive-foreground/5" : "border-l-primary"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${categoryStyles[announcement.category]}`}>
                    {categoryIcons[announcement.category]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${categoryStyles[announcement.category]}`}
                    >
                      {announcement.category}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">{announcement.date}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
            </Card>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <Card className="p-12 text-center">
            <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No announcements found</h3>
            <p className="text-muted-foreground">There are no announcements in this category.</p>
          </Card>
        )}
      </div>
    </StudentLayout>
  )
}
