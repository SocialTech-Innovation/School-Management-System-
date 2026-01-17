import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface TimetableEntry {
  time: string
  subject: string
  location: string
  teacher: string
  status: "completed" | "ongoing" | "upcoming"
}

const statusStyles = {
  completed: "bg-muted text-muted-foreground",
  ongoing: "bg-info-light text-info border-info",
  upcoming: "bg-card text-foreground border-border",
}

const statusDotStyles = {
  completed: "bg-muted-foreground",
  ongoing: "bg-info animate-pulse",
  upcoming: "bg-border",
}

export function TodaysTimetable() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
  
  const schedule: TimetableEntry[] = [
    { time: "08:30 AM", subject: "Mathematics", location: "Room 101", teacher: "Mr. Anderson", status: "completed" },
    { time: "09:30 AM", subject: "Physics", location: "Lab 3", teacher: "Ms. Curie", status: "ongoing" },
    { time: "11:00 AM", subject: "English Literature", location: "Room 214", teacher: "Mrs. Woolf", status: "upcoming" },
    { time: "01:00 PM", subject: "Computer Science", location: "Lab 1", teacher: "Mr. Gates", status: "upcoming" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Today's Timetable</span>
          <Clock className="w-5 h-5 text-muted-foreground" />
        </CardTitle>
        <p className="text-sm text-muted-foreground">{today}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((entry, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${statusDotStyles[entry.status]}`} />
              {index < schedule.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-1" />
              )}
            </div>
            
            {/* Content */}
            <div className={`flex-1 pb-4 ${index === schedule.length - 1 ? '' : 'border-b border-border'}`}>
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-foreground">{entry.subject}</h4>
                <span className="text-xs text-muted-foreground">{entry.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {entry.location} • {entry.teacher}
              </p>
              <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full border ${statusStyles[entry.status]}`}>
                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
