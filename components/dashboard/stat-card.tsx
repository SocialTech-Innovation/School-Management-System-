import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  icon: string
  label: string
  value: string
  badge: string
  badgeColor: string
}

export function StatCard({ icon, label, value, badge, badgeColor }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{icon}</div>
          <Badge className={`${badgeColor} border-0`}>{badge}</Badge>
        </div>
        <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}
