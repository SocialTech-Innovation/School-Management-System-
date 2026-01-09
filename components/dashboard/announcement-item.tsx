interface AnnouncementItemProps {
  icon: string
  title: string
  subtitle?: string
  time: string
}

export function AnnouncementItem({ icon, title, subtitle, time }: AnnouncementItemProps) {
  return (
    <div className="pb-4 border-b border-border last:border-b-0 last:pb-0">
      <div className="flex gap-3">
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          <p className="text-xs text-muted-foreground mt-2">{time}</p>
        </div>
      </div>
    </div>
  )
}
