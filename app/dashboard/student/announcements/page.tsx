"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function StudentAnnouncements() {
  const announcements = [
    {
      id: 1,
      icon: "⚠️",
      title: "School Closure Notice",
      content: "School will close early on Friday for staff development. Dismissal is at 12:00 PM.",
      date: "Today, 9:00 AM",
      priority: "high",
    },
    {
      id: 2,
      icon: "🔬",
      title: "Science Fair Registration",
      content: "Registration for the annual science fair is now open. Submit your project proposals by Nov 1st.",
      date: "Yesterday",
      priority: "normal",
    },
    {
      id: 3,
      icon: "📚",
      title: "Library Extended Hours",
      content: "The school library will now be open until 6 PM on weekdays during the exam season.",
      date: "2 days ago",
      priority: "normal",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Link href="/dashboard/student" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-6">Announcements</h1>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`hover:shadow-lg transition ${
                announcement.priority === "high" ? "border-l-4 border-l-red-500" : ""
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <span className="text-3xl flex-shrink-0">{announcement.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                    <p className="text-muted-foreground mb-3">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground">{announcement.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
