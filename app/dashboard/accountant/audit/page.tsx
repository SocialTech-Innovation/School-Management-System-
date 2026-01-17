"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"

const events = [
  { actor: "System", action: "Posted payroll", ref: "January 2026", time: "Today 09:12" },
  { actor: "Anika Rao", action: "Approved expense", ref: "Science lab", time: "Today 08:40" },
  { actor: "System", action: "Generated invoices", ref: "Grade 9", time: "Yesterday" },
  { actor: "Finance Bot", action: "Flagged variance", ref: "Cafeteria budget", time: "Yesterday" },
]

export default function AuditPage() {
  return (
    <AccountantLayout title="Audit Log">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent events</CardTitle>
            <Badge variant="secondary" className="bg-amber-50 text-amber-700">Immutable</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((evt) => (
              <div key={evt.action + evt.time} className="p-3 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{evt.action}</p>
                    <p className="text-xs text-muted-foreground">{evt.ref}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{evt.actor}</p>
                  <p className="text-xs text-muted-foreground">{evt.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
