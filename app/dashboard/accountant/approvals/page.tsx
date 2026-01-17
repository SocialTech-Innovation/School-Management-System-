"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

const approvals = [
  { type: "Expense", title: "Science lab purchase", requester: "Alex Morgan", amount: 2400, status: "Pending" },
  { type: "Invoice", title: "Tuition Grade 9", requester: "System", amount: 18450, status: "Ready" },
  { type: "Payroll", title: "January cycle", requester: "HR", amount: 91300, status: "Pending" },
]

export default function ApprovalsPage() {
  return (
    <AccountantLayout title="Approvals">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Awaiting your approval</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {approvals.map((item) => (
              <div key={item.title} className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.type} · {item.requester}</p>
                </div>
                <div className="font-semibold">${item.amount.toLocaleString()}</div>
                <Badge variant="secondary" className={item.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}>{item.status}</Badge>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" className="gap-1 text-emerald-700"><CheckCircle2 className="w-4 h-4" /> Approve</Button>
                  <Button variant="outline" size="sm" className="gap-1 text-rose-700"><XCircle className="w-4 h-4" /> Reject</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
