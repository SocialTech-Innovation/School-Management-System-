import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AdminStatCardProps {
  icon: string
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
}

export function AdminStatCard({ icon, label, value, change, trend }: AdminStatCardProps) {
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{icon}</div>
          {trend !== "neutral" && (
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon size={16} />
              <span className="text-sm font-semibold">{change}</span>
            </div>
          )}
        </div>
        <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}
