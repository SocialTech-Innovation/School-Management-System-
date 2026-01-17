"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calculator, Download } from "lucide-react"

const budgets = [
  { category: "Instruction", planned: 120000, actual: 118400 },
  { category: "Transport", planned: 28000, actual: 26500 },
  { category: "Cafeteria", planned: 19000, actual: 21400 },
  { category: "Facilities", planned: 24000, actual: 19800 },
]

export default function BudgetPage() {
  return (
    <AccountantLayout title="Budget">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Budget vs actual (Jan)</CardTitle>
              <p className="text-sm text-muted-foreground">Track burn and variances</p>
            </div>
            <Button size="sm" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgets.map((b) => {
              const progress = Math.min(100, Math.round((b.actual / b.planned) * 100))
              return (
                <div key={b.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-600" />
                      <p className="font-semibold text-foreground">{b.category}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">${b.actual.toLocaleString()} of ${b.planned.toLocaleString()}</div>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Utilization {progress}%</span>
                    <Badge variant="secondary" className={progress > 100 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}>
                      {progress > 100 ? "Over budget" : "Within budget"}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Scenario notes</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="p-3 border rounded-lg">Plan A: Maintain current spend; cash runway 7.5 months.</div>
            <div className="p-3 border rounded-lg">Plan B: Defer non-critical lab upgrades; runway 9.2 months.</div>
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
