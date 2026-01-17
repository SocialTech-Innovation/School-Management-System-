import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone } from "lucide-react"

interface AnnouncementProps {
  title: string
  description: string
  time: string
  priority?: "high" | "medium" | "low"
}

const announcements: AnnouncementProps[] = [
  {
    title: "Early Dismissal Friday",
    description: "School will close early on Friday for staff development. Dismissal is at 12:00 PM.",
    time: "Today, 9:00 AM",
    priority: "high",
  },
  {
    title: "Science Fair Registration",
    description: "Registration for the annual science fair is now open. Submit your project proposals by Nov 1st.",
    time: "Yesterday",
    priority: "medium",
  },
  {
    title: "Parent-Teacher Conference",
    description: "Parent-teacher conferences scheduled for next week. Please book your slot.",
    time: "2 days ago",
    priority: "medium",
  },
]

const priorityStyles = {
  high: "bg-destructive-foreground/10 border-l-4 border-destructive",
  medium: "bg-info-light border-l-4 border-info",
  low: "bg-muted border-l-4 border-border",
}

export function Announcements() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Announcements</CardTitle>
          <Megaphone className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${priorityStyles[announcement.priority || "low"]}`}
          >
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-semibold text-foreground">{announcement.title}</h4>
              <span className="text-xs text-muted-foreground">{announcement.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{announcement.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
