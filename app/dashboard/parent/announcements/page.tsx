"use client"

import React, { useState, useEffect } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bell, Calendar, AlertCircle, Info, Megaphone, Pin } from "lucide-react"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  category: 'holiday' | 'meeting' | 'academic' | 'event' | 'important' | 'info'
  pinned: boolean
  author: string
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Winter Break Schedule',
    content: 'School will be closed from December 20, 2025 to January 5, 2026 for winter break. Classes will resume on January 6, 2026.',
    date: 'Dec 01, 2025',
    category: 'holiday',
    pinned: true,
    author: 'Principal Office',
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    content: 'We are pleased to invite all parents to attend the Parent-Teacher Meeting scheduled for January 15, 2026 from 3:00 PM to 6:00 PM.',
    date: 'Jan 05, 2026',
    category: 'meeting',
    pinned: true,
    author: 'Academic Office',
  },
  {
    id: '3',
    title: 'Mid-Term Examination Schedule Released',
    content: 'The mid-term examination schedule for all grades has been released. Please check the Timetable section for detailed timings.',
    date: 'Jan 08, 2026',
    category: 'academic',
    pinned: false,
    author: 'Examination Cell',
  },
  {
    id: '4',
    title: 'Science Fair 2026',
    content: 'We are excited to announce the annual Science Fair on February 15, 2026. Students interested in participating should register by January 31, 2026.',
    date: 'Jan 10, 2026',
    category: 'event',
    pinned: false,
    author: 'Science Department',
  },
  {
    id: '5',
    title: 'Fee Payment Reminder',
    content: 'This is a reminder that Term 2 fees are due by January 30, 2026. Please ensure timely payment to avoid late fees.',
    date: 'Jan 10, 2026',
    category: 'important',
    pinned: false,
    author: 'Accounts Office',
  },
  {
    id: '6',
    title: 'Library Extended Hours',
    content: 'The school library will have extended hours during the examination period. The library will remain open until 6:00 PM.',
    date: 'Jan 09, 2026',
    category: 'info',
    pinned: false,
    author: 'Library',
  },
]

const getCategoryIcon = (category: string, size: number = 20) => {
  const iconProps = { size }
  switch (category) {
    case 'holiday':
      return <Calendar className="text-success" {...iconProps} />
    case 'meeting':
      return <Bell className="text-warning" {...iconProps} />
    case 'academic':
      return <Info className="text-primary" {...iconProps} />
    case 'event':
      return <Megaphone className="text-info" {...iconProps} />
    case 'important':
      return <AlertCircle className="text-destructive" {...iconProps} />
    case 'info':
      return <Info className="text-muted-foreground" {...iconProps} />
    default:
      return <Info className="text-muted-foreground" {...iconProps} />
  }
}

const categoryColors: Record<string, string> = {
  holiday: 'bg-success/10 border-success/30',
  meeting: 'bg-warning/10 border-warning/30',
  academic: 'bg-primary/10 border-primary/30',
  event: 'bg-info/10 border-info/30',
  important: 'bg-destructive/10 border-destructive/30',
  info: 'bg-muted/50 border-muted',
}

export default function AnnouncementsPage() {
  const [selectedChild, setSelectedChild] = useState(childrenData[0])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
      document.title = "Announcements"
    }, [])

  const filteredAnnouncements = selectedCategory === 'all'
    ? mockAnnouncements
    : mockAnnouncements.filter(a => a.category === selectedCategory)

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned)
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned)

  return (
    <ParentLayout title="Announcements" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Category Filter Dropdown */}
        <Card className="animate-slide-up">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-muted-foreground">Filter by category:</p>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="important">Important</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Pin className="w-5 h-5 text-primary" />
              Pinned Announcements
            </h2>
            {pinnedAnnouncements.map((announcement, index) => (
              <Card
                key={announcement.id}
                className={`border-2 ${categoryColors[announcement.category]} animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {getCategoryIcon(announcement.category, 24)}
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-muted-foreground">{announcement.author}</span>
                          <span className="text-sm text-muted-foreground">{announcement.date}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-primary text-white">
                      <Pin className="w-3 h-3 mr-1" />
                      Pinned
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-muted-foreground">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Regular Announcements */}
        {regularAnnouncements.length > 0 && (
          <div className="space-y-4">
            {pinnedAnnouncements.length > 0 && (
              <h2 className="text-lg font-semibold text-foreground">All Announcements</h2>
            )}
            {regularAnnouncements.map((announcement, index) => (
              <Card
                key={announcement.id}
                className={`${categoryColors[announcement.category]} animate-slide-up`}
                style={{ animationDelay: `${(pinnedAnnouncements.length + index) * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(announcement.category, 24)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-muted-foreground">{announcement.author}</span>
                        <span className="text-sm text-muted-foreground">{announcement.date}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-muted-foreground">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredAnnouncements.length === 0 && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-muted-foreground">No announcements found</p>
              <p className="text-sm text-muted-foreground mt-1">Check back later for updates</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ParentLayout>
  )
}
