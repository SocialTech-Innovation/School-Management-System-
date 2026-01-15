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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Megaphone,
  Plus,
  Pin,
  Calendar,
  Users,
  Edit,
  Trash2,
  Eye,
  Send,
  Search,
  AlertCircle,
} from "lucide-react"
import { useState, useEffect } from "react"

const announcements = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule Released",
    content: "The mid-term examination schedule for all grades has been published. Students are advised to check their respective class sections for detailed timetables and exam guidelines.",
    category: "Academic",
    date: "Jan 14, 2026",
    author: "Dr. Sarah Johnson",
    role: "Academic Director",
    isPinned: true,
    audience: "All Students",
    priority: "High",
  },
  {
    id: 2,
    title: "Annual Sports Day - Registration Open",
    content: "Registration is now open for the Annual Sports Day 2026. Students interested in participating should register through their class teachers before Jan 20, 2026.",
    category: "Sports",
    date: "Jan 13, 2026",
    author: "Coach Michael Brown",
    role: "Sports Director",
    isPinned: true,
    audience: "All Students",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting Schedule",
    content: "The quarterly parent-teacher meeting is scheduled for Jan 28, 2026. Parents can book slots through the school portal starting Jan 15.",
    category: "General",
    date: "Jan 12, 2026",
    author: "Principal Margaret Wilson",
    role: "Principal",
    isPinned: false,
    audience: "Parents",
    priority: "High",
  },
  {
    id: 4,
    title: "Library Hours Extended",
    content: "Due to upcoming examinations, the school library will remain open until 7:00 PM from Monday to Friday. Special study rooms are available on prior booking.",
    category: "Facility",
    date: "Jan 11, 2026",
    author: "Mrs. Emily Davis",
    role: "Librarian",
    isPinned: false,
    audience: "All Students",
    priority: "Low",
  },
  {
    id: 5,
    title: "Career Guidance Workshop",
    content: "A special career guidance workshop for Grade 11 and 12 students will be conducted on Feb 08, 2026. Industry experts and university representatives will be present.",
    category: "Academic",
    date: "Jan 10, 2026",
    author: "Dr. Robert Martinez",
    role: "Career Counselor",
    isPinned: false,
    audience: "Grade 11-12",
    priority: "Medium",
  },
  {
    id: 6,
    title: "Science Exhibition - Call for Projects",
    content: "Students from Grade 9-12 are invited to submit their science projects for the upcoming Science Exhibition on Feb 05, 2026. Submission deadline: Jan 25.",
    category: "Academic",
    date: "Jan 09, 2026",
    author: "Prof. David Chen",
    role: "Science Head",
    isPinned: false,
    audience: "Grade 9-12",
    priority: "Medium",
  },
]

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [audienceFilter, setAudienceFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || announcement.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || announcement.priority === priorityFilter
    const matchesAudience = audienceFilter === "all" || announcement.audience.includes(audienceFilter)
    return matchesSearch && matchesCategory && matchesPriority && matchesAudience
  })

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned)
  const recentAnnouncements = filteredAnnouncements.filter(a => !a.isPinned)

  return (
    <AdminLayout title="Announcements">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Announcements</h2>
            <p className="text-muted-foreground mt-1">Create and manage school announcements</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Create and publish a new announcement for the school community.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" placeholder="Enter announcement title..." required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea 
                    id="content" 
                    placeholder="Enter announcement content..." 
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="facility">Facility</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="audience">Audience *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students & Staff</SelectItem>
                      <SelectItem value="students">All Students</SelectItem>
                      <SelectItem value="teachers">All Teachers</SelectItem>
                      <SelectItem value="parents">All Parents</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                      <SelectItem value="9-12">Grade 9-12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="pin" 
                    checked={isPinned}
                    onCheckedChange={(checked) => setIsPinned(checked === true)}
                  />
                  <Label htmlFor="pin" className="cursor-pointer">
                    Pin this announcement to the top
                  </Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Publish Announcement
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Announcements</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{announcements.length}</p>
                </div>
                <Megaphone className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pinned</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{pinnedAnnouncements.length}</p>
                </div>
                <Pin className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-foreground mt-1">6</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-foreground mt-1">2</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle>All Announcements ({filteredAnnouncements.length})</CardTitle>
              
              {/* Search and Filters inside card */}
              <div className="flex gap-3 flex-wrap w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search announcements..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Facility">Facility</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={audienceFilter} onValueChange={setAudienceFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Students">Students</SelectItem>
                    <SelectItem value="Parents">Parents</SelectItem>
                    <SelectItem value="Teachers">Teachers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredAnnouncements.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No announcements found matching your criteria
              </div>
            ) : (
              <div className="space-y-4">
                {/* Pinned Announcements */}
                {pinnedAnnouncements.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                      <Pin className="w-4 h-4" />
                      Pinned Announcements
                    </h3>
                    {pinnedAnnouncements.map((announcement) => (
                      <Card key={announcement.id} className="border-l-4 border-l-amber-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">{announcement.title}</h3>
                                <Badge variant={announcement.priority === "High" ? "destructive" : "outline"}>
                                  {announcement.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {announcement.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {announcement.audience}
                                </div>
                                <Badge variant="outline" className="text-xs">{announcement.category}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-3 border-t">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="my-6 border-t"></div>
                  </>
                )}

                {/* Recent Announcements */}
                {recentAnnouncements.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Recent Announcements
                    </h3>
                    {recentAnnouncements.map((announcement) => (
                      <Card key={announcement.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">{announcement.title}</h3>
                                <Badge variant={announcement.priority === "High" ? "destructive" : "outline"}>
                                  {announcement.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {announcement.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {announcement.audience}
                                </div>
                                <Badge variant="outline" className="text-xs">{announcement.category}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-3 border-t">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
