"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarClock, Banknote, CheckCircle2, AlertCircle } from "lucide-react"

const cycles = [
  { name: "January 2026", amount: 91300, cutoff: "Jan 20", payDate: "Jan 27", status: "In review" },
  { name: "December 2025", amount: 90450, cutoff: "Dec 20", payDate: "Dec 27", status: "Paid" },
]

const adjustments = [
  { staff: "Emma Wilson", role: "Science Teacher", type: "Extra class", amount: 320, status: "Pending" },
  { staff: "Michael Brown", role: "Counselor", type: "Leave deduction", amount: -180, status: "Applied" },
  { staff: "Riya Patel", role: "Accountant", type: "Bonus", amount: 600, status: "Pending" },
]

export default function PayrollPage() {
  return (
    <AccountantLayout title="Payroll">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Payroll cycles</CardTitle>
              <p className="text-sm text-muted-foreground">Review, approve, and post payroll</p>
            </div>
            <Button size="sm" className="gap-2"><CheckCircle2 className="w-4 h-4" /> Approve cycle</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {cycles.map((cycle) => (
              <div key={cycle.name} className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-4 gap-3 items-center hover:border-amber-200 transition">
                <div>
                  <p className="font-semibold text-foreground">{cycle.name}</p>
                  <p className="text-xs text-muted-foreground">Cutoff {cycle.cutoff}</p>
                </div>
                <div className="font-semibold">${cycle.amount.toLocaleString()}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarClock className="w-4 h-4" /> Pay date {cycle.payDate}
                </div>
                <Badge variant="secondary" className={cycle.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>
                  {cycle.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Adjustments</CardTitle>
            <Button variant="outline" size="sm">Upload CSV</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {adjustments.map((adj) => (
              <div key={adj.staff} className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                <div>
                  <p className="font-semibold text-foreground">{adj.staff}</p>
                  <p className="text-xs text-muted-foreground">{adj.role}</p>
                </div>
                <div className="text-sm text-muted-foreground">{adj.type}</div>
                <div className={`font-semibold ${adj.amount >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {adj.amount >= 0 ? "+" : "-"}${Math.abs(adj.amount).toLocaleString()}
                </div>
                <Badge variant="secondary" className={adj.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}>
                  {adj.status}
                </Badge>
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm">Apply</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Compliance checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <ChecklistItem label="Tax tables updated" done />
              <ChecklistItem label="Provident fund export generated" done />
              <ChecklistItem label="Bank file pending signature" />
              <ChecklistItem label="Variance vs prior month reviewed" />
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 border rounded-lg bg-amber-50 text-amber-800 flex gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                3 staff pending bank details; hold payment until updated.
              </div>
              <div className="p-3 border rounded-lg bg-blue-50 text-blue-800 flex gap-2">
                <Banknote className="w-4 h-4 mt-0.5" />
                Finalize allowance mapping before posting.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AccountantLayout>
  )
}

function ChecklistItem({ label, done }: { label: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full border ${done ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground"}`}></div>
      <span className={done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  )
}
