import { LucideIcon } from "lucide-react"

interface KPICardProps {
  icon: LucideIcon
  value: string
  label: string
  badge?: {
    text: string
    variant: "success" | "warning" | "info" | "error"
  }
  subtext?: string
}

export function KPICard({ icon: Icon, value, label, badge, subtext }: KPICardProps) {
  const badgeClasses = {
    success: "status-success",
    warning: "status-warning",
    info: "status-info",
    error: "status-error",
  }

  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {badge && (
          <span className={`status-badge ${badgeClasses[badge.variant]}`}>
            {badge.text}
          </span>
        )}
        {subtext && !badge && (
          <span className="text-xs text-muted-foreground">{subtext}</span>
        )}
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
