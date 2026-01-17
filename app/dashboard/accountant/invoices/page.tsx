"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Send, Plus, Filter } from "lucide-react"

const invoices = [
  { number: "INV-2481", issued: "Jan 10, 2026", due: "Jan 24, 2026", customer: "Grade 10 Cohort", amount: 18450, status: "Sent" },
  { number: "INV-2479", issued: "Jan 8, 2026", due: "Jan 22, 2026", customer: "Grade 11 Cohort", amount: 20120, status: "Viewed" },
  { number: "INV-2475", issued: "Jan 2, 2026", due: "Jan 15, 2026", customer: "After-school Club", amount: 3200, status: "Paid" },
  { number: "INV-2468", issued: "Dec 20, 2025", due: "Jan 5, 2026", customer: "Grade 12 Cohort", amount: 22400, status: "Overdue" },
]

export default function InvoicesPage() {
  return (
    <AccountantLayout title="Invoices">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Invoice pipeline</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Filter className="w-4 h-4" /> Filters</Button>
              <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> New invoice</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.number} className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-5 gap-3 items-center hover:border-amber-200 transition">
                <div>
                  <p className="font-semibold text-foreground">{inv.number}</p>
                  <p className="text-xs text-muted-foreground">Issued {inv.issued}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{inv.customer}</p>
                  <p className="text-xs text-muted-foreground">Due {inv.due}</p>
                </div>
                <div className="font-semibold">${inv.amount.toLocaleString()}</div>
                <Badge
                  variant="secondary"
                  className={
                    inv.status === "Paid"
                      ? "bg-emerald-100 text-emerald-700"
                      : inv.status === "Overdue"
                      ? "bg-rose-100 text-rose-700"
                      : inv.status === "Viewed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }
                >
                  {inv.status}
                </Badge>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm">View</Button>
                  <Button size="sm" className="gap-2"><Send className="w-4 h-4" /> Send</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Templates</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {["Tuition", "Transport", "Activities"].map((name) => (
              <div key={name} className="p-4 border rounded-lg hover:border-amber-200 transition flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">Prefilled line items</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2"><FileText className="w-4 h-4" /> Use</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
