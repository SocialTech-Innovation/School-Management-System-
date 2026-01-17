"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Receipt, UploadCloud, Filter, Tag } from "lucide-react"

const expenses = [
  { vendor: "Metro Supplies", category: "Stationery", amount: 2200, status: "Queued", submitted: "Today" },
  { vendor: "Bright Transport", category: "Maintenance", amount: 4800, status: "Approved", submitted: "Yesterday" },
  { vendor: "GreenCaf", category: "Cafeteria", amount: 3100, status: "Posted", submitted: "Jan 12" },
  { vendor: "TalentHub", category: "Visiting Staff", amount: 1800, status: "Review", submitted: "Jan 11" },
]

export default function ExpensesPage() {
  return (
    <AccountantLayout title="Expenses">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Expense queue</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Filter className="w-4 h-4" /> Filters</Button>
              <Button size="sm" className="gap-2"><UploadCloud className="w-4 h-4" /> Upload receipts</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {expenses.map((exp) => (
              <div key={exp.vendor + exp.submitted} className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-5 gap-3 items-center hover:border-amber-200 transition">
                <div>
                  <p className="font-semibold text-foreground">{exp.vendor}</p>
                  <p className="text-xs text-muted-foreground">{exp.category}</p>
                </div>
                <div className="font-semibold">${exp.amount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Submitted {exp.submitted}</div>
                <Badge
                  variant="secondary"
                  className={
                    exp.status === "Posted"
                      ? "bg-emerald-100 text-emerald-700"
                      : exp.status === "Approved"
                      ? "bg-blue-100 text-blue-700"
                      : exp.status === "Queued"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }
                >
                  {exp.status}
                </Badge>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm">View</Button>
                  <Button size="sm" className="gap-2"><Tag className="w-4 h-4" /> Tag</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Policies</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {["Travel", "Supplies", "Events"].map((policy) => (
              <div key={policy} className="p-4 border rounded-lg hover:border-amber-200 transition">
                <p className="font-semibold text-foreground">{policy}</p>
                <p className="text-xs text-muted-foreground mt-1">Auto-flag over-limit submissions</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
