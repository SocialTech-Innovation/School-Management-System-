export function RecentActivities() {
  const activities = [
    { icon: "✅", text: "New student enrolled", time: "2 hours ago" },
    { icon: "📝", text: "Attendance marked", time: "4 hours ago" },
    { icon: "💰", text: "Fee payment received", time: "6 hours ago" },
    { icon: "📊", text: "Report generated", time: "1 day ago" },
    { icon: "👨‍🏫", text: "Teacher joined", time: "2 days ago" },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0">
          <span className="text-lg flex-shrink-0">{activity.icon}</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{activity.text}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
