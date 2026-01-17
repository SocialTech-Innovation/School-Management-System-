"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, BellRing, Download, Send } from "lucide-react"

const feeCycles = [
  { name: "Term 2 Tuition", billed: 92000, collected: 80400, dueDate: "Jan 31, 2026", status: "In progress" },
  { name: "Transport", billed: 14200, collected: 11800, dueDate: "Feb 5, 2026", status: "In progress" },
  { name: "Cafeteria", billed: 8600, collected: 6600, dueDate: "Weekly", status: "Rolling" },
]

const pendingReminders = [
  { name: "Sophia Khan", grade: "12", amount: 1450, lastSent: "Today" },
  { name: "Liam Carter", grade: "10", amount: 920, lastSent: "Yesterday" },
  { name: "Noah Patel", grade: "9", amount: 760, lastSent: "3 days ago" },
]

export default function FeesPage() {
  return (
    <AccountantLayout title="Fee Collections">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Collected this month</CardTitle>
              <Wallet className="w-5 h-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$126,400</p>
              <p className="text-sm text-muted-foreground">+8.4% vs last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$38,950</p>
              <p className="text-sm text-muted-foreground">12% of billed this term</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Auto-reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3 cohorts</p>
              <p className="text-sm text-muted-foreground">Parents notified weekly</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Active fee cycles</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
              <Button size="sm" className="gap-2"><Send className="w-4 h-4" /> New invoice</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {feeCycles.map((cycle) => (
              <div key={cycle.name} className="p-4 border rounded-lg flex items-center justify-between hover:border-amber-200 transition">
                <div>
                  <p className="font-semibold text-foreground">{cycle.name}</p>
                  <p className="text-xs text-muted-foreground">Due {cycle.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Billed: ${cycle.billed.toLocaleString()}</p>
                  <p className="text-lg font-semibold text-foreground">Collected: ${cycle.collected.toLocaleString()}</p>
                </div>
                <Badge variant="secondary" className="bg-amber-50 text-amber-700">{cycle.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Pending reminders</CardTitle>
            <Button variant="ghost" size="sm" className="gap-2 text-amber-600">
              <BellRing className="w-4 h-4" /> Send all
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingReminders.map((item) => (
              <div key={item.name} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Grade {item.grade}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Last sent: {item.lastSent}</p>
                </div>
                <Button size="sm" variant="outline">Nudge</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
