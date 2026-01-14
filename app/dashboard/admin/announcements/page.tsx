"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
} from "lucide-react"

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

const pinnedAnnouncements = announcements.filter((a) => a.isPinned)
const recentAnnouncements = announcements.filter((a) => !a.isPinned)

export default function AnnouncementsPage() {
  return (
    <AdminLayout title="Announcements">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Announcements</h2>
            <p className="text-muted-foreground mt-1">Manage school-wide announcements and notifications</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Announcement
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
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
                  <p className="text-2xl font-bold text-foreground mt-1">4</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reach</p>
                  <p className="text-2xl font-bold text-foreground mt-1">2,456</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search announcements..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="facility">Facility</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Pin className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-blue-900">Pinned Announcements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pinnedAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="bg-white border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{announcement.title}</h3>
                          <Badge
                            className={
                              announcement.priority === "High"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : announcement.priority === "Medium"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {announcement.priority}
                          </Badge>
                          <Badge variant="outline">{announcement.category}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                        
                        <div className="flex items-center gap-6 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{announcement.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{announcement.audience}</span>
                          </div>
                          <div>
                            <span className="font-medium">{announcement.author}</span> · {announcement.role}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{announcement.title}</h3>
                        <Badge
                          className={
                            announcement.priority === "High"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : announcement.priority === "Medium"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                          }
                        >
                          {announcement.priority}
                        </Badge>
                        <Badge variant="outline">{announcement.category}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                      
                      <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{announcement.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{announcement.audience}</span>
                        </div>
                        <div>
                          <span className="font-medium">{announcement.author}</span> · {announcement.role}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" title="Pin">
                        <Pin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
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
