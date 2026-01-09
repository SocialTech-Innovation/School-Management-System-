import { Badge } from "@/components/ui/badge"

interface TimelineEventProps {
  time: string
  title: string
  location: string
  status: "Completed" | "Ongoing" | "Upcoming"
}

export function TimelineEvent({ time, title, location, status }: TimelineEventProps) {
  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Ongoing: "bg-blue-100 text-blue-800",
    Upcoming: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="text-sm font-semibold text-muted-foreground">{time}</div>
      </div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mb-2">{location}</p>
        <Badge className={`${statusColors[status]} border-0`}>{status}</Badge>
      </div>
    </div>
  )
}
