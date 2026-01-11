"use client"

import { useState, useEffect } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, Search, Filter, CheckCircle, AlertCircle, 
  FileText, Calendar, Clock, Trash2, BookOpen
} from "lucide-react"

interface Notification {
  id: string
  type: "grade_submitted" | "announcement" | "reminder" | "system"
  title: string
  message: string
  timestamp: string
  class?: string
  assessment?: string
  isRead: boolean
}

const mockAnnouncements: Notification[] = [
  {
    id: "ann-1",
    type: "announcement",
    title: "School Assembly Next Monday",
    message: "All teachers are required to attend the annual school assembly on Monday, March 18th at 9:00 AM.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false
  },
  {
    id: "ann-2",
    type: "reminder",
    title: "Exam Schedule Upload Deadline",
    message: "Please upload your exam schedules by Friday, March 15th.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true
  },
  {
    id: "ann-3",
    type: "system",
    title: "System Maintenance",
    message: "The grading system will be under maintenance on Sunday from 2 AM to 6 AM.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true
  },
  {
    id: "ann-4",
    type: "announcement",
    title: "Parent-Teacher Meeting Schedule",
    message: "Parent-teacher meetings will be held on March 20th-22nd. Please check your assigned time slots in the calendar.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false
  },
  {
    id: "ann-5",
    type: "reminder",
    title: "Submit Lesson Plans",
    message: "Reminder: Monthly lesson plans are due by end of this week. Please submit them through the portal.",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false
  },
  {
    id: "ann-6",
    type: "announcement",
    title: "Professional Development Workshop",
    message: "Join us for a workshop on 'Innovative Teaching Methods' on March 25th at 3:00 PM in the auditorium.",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true
  }
]

export default function AnnouncementsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = JSON.parse(localStorage.getItem("teacher_notifications") || "[]")
    const allNotifications = [...storedNotifications, ...mockAnnouncements].map(n => ({
      ...n,
      isRead: n.isRead ?? false
    }))
    
    // Sort by timestamp (newest first)
    allNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    setNotifications(allNotifications)
  }, [])

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ))
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    
    // Update localStorage
    const storedNotifications = JSON.parse(localStorage.getItem("teacher_notifications") || "[]")
    const updatedStored = storedNotifications.filter((n: Notification) => n.id !== id)
    localStorage.setItem("teacher_notifications", JSON.stringify(updatedStored))
  }

  const filteredNotifications = notifications
    .filter(n => {
      if (activeTab === "all") return true
      if (activeTab === "unread") return !n.isRead
      return n.type === activeTab
    })
    .filter(n => 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grade_submitted":
        return <CheckCircle className="w-5 h-5 text-success" />
      case "announcement":
        return <Bell className="w-5 h-5 text-info" />
      case "reminder":
        return <AlertCircle className="w-5 h-5 text-warning" />
      case "system":
        return <FileText className="w-5 h-5 text-muted-foreground" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "grade_submitted":
        return <Badge className="bg-success">Grade Submission</Badge>
      case "announcement":
        return <Badge className="bg-info">Announcement</Badge>
      case "reminder":
        return <Badge className="bg-warning">Reminder</Badge>
      case "system":
        return <Badge variant="outline">System</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <TeacherLayout title="Announcements & Notifications">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-3xl font-bold text-foreground">{notifications.length}</p>
                </div>
                <Bell className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-3xl font-bold text-warning">{unreadCount}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Grade Submissions</p>
                  <p className="text-3xl font-bold text-success">
                    {notifications.filter(n => n.type === "grade_submitted").length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Announcements</p>
                  <p className="text-3xl font-bold text-info">
                    {notifications.filter(n => n.type === "announcement").length}
                  </p>
                </div>
                <Bell className="w-10 h-10 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Card */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                <TabsTrigger value="grade_submitted">
                  Grades ({notifications.filter(n => n.type === "grade_submitted").length})
                </TabsTrigger>
                <TabsTrigger value="announcement">
                  Announcements ({notifications.filter(n => n.type === "announcement").length})
                </TabsTrigger>
                <TabsTrigger value="reminder">
                  Reminders ({notifications.filter(n => n.type === "reminder").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium text-muted-foreground">No notifications found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchQuery ? "Try adjusting your search" : "You're all caught up!"}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification, index) => (
                    <Card 
                      key={notification.id}
                      className={`transition-all hover:shadow-md animate-slide-up ${!notification.isRead ? "border-l-4 border-l-primary bg-primary/5" : ""}`}
                      style={{ animationDelay: `${250 + index * 30}ms` }}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            {getTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-foreground">{notification.title}</h3>
                                  {!notification.isRead && (
                                    <Badge variant="outline" className="text-xs">New</Badge>
                                  )}
                                </div>
                                {getTypeBadge(notification.type)}
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.isRead && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleMarkAsRead(notification.id)}
                                  >
                                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDelete(notification.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {notification.class && (
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  {notification.class}
                                </span>
                              )}
                              {notification.assessment && (
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {notification.assessment}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  )
}
