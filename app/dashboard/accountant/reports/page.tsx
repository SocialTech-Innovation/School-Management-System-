"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, BarChart3 } from "lucide-react"

const reports = [
  { name: "Income Statement", period: "Jan 2026", size: "1.2 MB" },
  { name: "Balance Sheet", period: "Jan 2026", size: "950 KB" },
  { name: "Cash Flow", period: "Jan 2026", size: "1.0 MB" },
  { name: "Aging Summary", period: "Jan 2026", size: "600 KB" },
]

export default function ReportsPage() {
  return (
    <AccountantLayout title="Reports">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Monthly package</CardTitle>
              <p className="text-sm text-muted-foreground">Financials and operational exports</p>
            </div>
            <Button className="gap-2"><Download className="w-4 h-4" /> Download all</Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reports.map((rep) => (
              <div key={rep.name} className="p-4 border rounded-lg flex items-center justify-between hover:border-amber-200 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{rep.name}</p>
                    <p className="text-xs text-muted-foreground">{rep.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{rep.size}</span>
                  <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Dashboards</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {["Revenue vs Expense", "Collections", "Payroll"].map((tile) => (
              <div key={tile} className="p-4 border rounded-lg flex items-center justify-between hover:border-amber-200 transition">
                <div>
                  <p className="font-semibold text-foreground">{tile}</p>
                  <p className="text-xs text-muted-foreground">Live charts and filters</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 text-amber-700"><BarChart3 className="w-4 h-4" /> Open</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
