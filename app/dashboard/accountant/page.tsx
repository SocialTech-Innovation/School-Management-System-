"use client"

import { useEffect, ReactNode } from "react"
import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Receipt,
  PiggyBank,
  Banknote,
  CalendarClock,
  TrendingUp,
  TrendingDown,
  Clock3,
  Download,
  Upload,
  FileText,
  CheckCircle2,
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"

const cashflowData = [
  { month: "Jul", inflow: 48000, outflow: 39000 },
  { month: "Aug", inflow: 52000, outflow: 41000 },
  { month: "Sep", inflow: 54000, outflow: 43000 },
  { month: "Oct", inflow: 56000, outflow: 44500 },
  { month: "Nov", inflow: 60000, outflow: 46000 },
  { month: "Dec", inflow: 64000, outflow: 48500 },
  { month: "Jan", inflow: 68000, outflow: 50500 },
]

const collectionsData = [
  { label: "Tuition", value: 42000 },
  { label: "Transport", value: 7600 },
  { label: "Cafeteria", value: 5800 },
  { label: "Activities", value: 4300 },
]

const receivables = [
  { student: "Liam Carter", className: "Grade 10", amount: 920, due: "3 days", status: "Overdue" },
  { student: "Sophia Khan", className: "Grade 12", amount: 1450, due: "Today", status: "Overdue" },
  { student: "Ethan Davis", className: "Grade 9", amount: 760, due: "5 days", status: "Pending" },
  { student: "Ava Williams", className: "Grade 11", amount: 1220, due: "12 days", status: "Upcoming" },
]

const payables = [
  { vendor: "Metro Supplies", category: "Stationery", amount: 3600, date: "Jan 22", status: "Scheduled" },
  { vendor: "Bright Transport", category: "Buses", amount: 12400, date: "Jan 24", status: "Awaiting" },
  { vendor: "GreenCaf", category: "Cafeteria", amount: 5300, date: "Jan 27", status: "Scheduled" },
  { vendor: "TalentHub", category: "Visiting Staff", amount: 2800, date: "Feb 2", status: "Draft" },
]

const recentTransactions = [
  { id: 1, type: "Collection", label: "Grade 10 Tuition", amount: 18450, time: "1h ago", positive: true },
  { id: 2, type: "Expense", label: "Science Lab Supplies", amount: 2200, time: "3h ago", positive: false },
  { id: 3, type: "Payroll", label: "Staff Advance Adjust", amount: 5400, time: "Today", positive: false },
  { id: 4, type: "Collection", label: "After-school Program", amount: 3200, time: "Yesterday", positive: true },
]

export default function AccountantDashboard() {
  useEffect(() => {
    document.title = "Accountant Dashboard"
  }, [])

  return (
    <AccountantLayout title="Accountant Dashboard">
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-wide text-white/80">Month close health</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Solid cash position for January</h1>
              <p className="text-sm sm:text-base text-white/80 mt-1">Collections are up 8% vs last month and payroll is fully provisioned.</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <Button className="bg-white text-amber-600 hover:bg-white/90 text-sm w-full sm:w-auto">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" /> Export Summary
                </Button>
                <Button variant="outline" className="border-white/70 text-white hover:bg-white/10 text-sm w-full sm:w-auto">
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" /> Import Bank Feed
                </Button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg px-4 sm:px-6 py-3 sm:py-4 border border-white/20">
              <p className="text-xs sm:text-sm text-white/80 mb-2">Cash on hand</p>
              <div className="flex items-end gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-bold">$482,600</span>
                <Badge className="bg-emerald-500/90 text-white">+12% MoM</Badge>
              </div>
              <p className="text-xs text-white/70 mt-1">Includes restricted funds: $42,000</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Fees collected"
            value="$126,400"
            delta="↑ 8.4% vs last month"
            icon={<Wallet className="w-5 h-5 text-amber-500" />}
            positive
          />
          <KpiCard
            title="Outstanding"
            value="$38,950"
            delta="12% of billed"
            icon={<CreditCard className="w-5 h-5 text-rose-500" />}
          />
          <KpiCard
            title="Expenses (MTD)"
            value="$72,180"
            delta="↑ 3.1% vs plan"
            icon={<Receipt className="w-5 h-5 text-sky-500" />}
          />
          <KpiCard
            title="Payroll ready"
            value="$91,300"
            delta="Payroll closes in 5 days"
            icon={<Banknote className="w-5 h-5 text-emerald-500" />}
            positive
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cashflow (last 7 months)</CardTitle>
              <Badge variant="secondary" className="bg-amber-50 text-amber-800">Live bank feed</Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={cashflowData}>
                  <defs>
                    <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb7185" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" tick={{ fill: "hsl(var(--foreground))" }} />
                  <YAxis stroke="hsl(var(--foreground))" tick={{ fill: "hsl(var(--foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "10px",
                    }}
                    formatter={(v: number) => `$${v.toLocaleString()}`}
                  />
                  <Area type="monotone" dataKey="inflow" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#inflow)" />
                  <Area type="monotone" dataKey="outflow" stroke="#fb7185" strokeWidth={2} fillOpacity={1} fill="url(#outflow)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Collections mix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {collectionsData.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item.label}</span>
                    <span className="text-foreground font-semibold">${item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                      style={{ width: `${(item.value / 42000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t text-xs text-muted-foreground">
                Updated from billing at 8:15 AM
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Receivables aging</CardTitle>
              <Button variant="ghost" size="sm" className="text-amber-600">Send reminders</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {receivables.map((item) => (
                <div
                  key={item.student}
                  className="p-3 rounded-lg border border-border hover:border-amber-200 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{item.student}</p>
                      <p className="text-xs text-muted-foreground">{item.className}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${item.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Due in {item.due}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <Badge
                      variant="secondary"
                      className={
                        item.status === "Overdue"
                          ? "bg-rose-100 text-rose-700"
                          : item.status === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }
                    >
                      {item.status}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-amber-600 h-8">Follow up</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Payables schedule</CardTitle>
              <Button variant="ghost" size="sm" className="text-amber-600">Approve batch</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {payables.map((item) => (
                <div key={item.vendor} className="p-3 rounded-lg border border-border flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{item.vendor}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.amount.toLocaleString()}</p>
                    <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                      <CalendarClock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <Badge variant="secondary" className="mt-2 bg-slate-100 text-slate-700">{item.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 shadow-sm">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Revenue vs expense (MTD)</CardTitle>
              <Badge variant="secondary">Budget variance</Badge>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={cashflowData.slice(2)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" tick={{ fill: "hsl(var(--foreground))" }} />
                  <YAxis stroke="hsl(var(--foreground))" tick={{ fill: "hsl(var(--foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "10px",
                    }}
                    formatter={(v: number) => `$${v.toLocaleString()}`}
                  />
                  <Bar dataKey="inflow" name="Revenue" fill="#fbbf24" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="outflow" name="Expense" fill="#818cf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent ledger entries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="p-3 rounded-lg border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        tx.positive ? "bg-emerald-500/80" : "bg-rose-500/80"
                      }`}
                    >
                      {tx.positive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{tx.label}</p>
                      <p className="text-xs text-muted-foreground">{tx.type} · {tx.time}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${tx.positive ? "text-emerald-600" : "text-rose-600"}`}>
                    {tx.positive ? "+" : "-"}${tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              <div className="text-xs text-muted-foreground pt-2 border-t">Synced with general ledger</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Quick actions</CardTitle>
            <div className="text-xs text-muted-foreground">Workflow shortcuts</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ActionButton icon={<FileText className="w-4 h-4" />} title="Create invoice" description="Bill a class or student" />
              <ActionButton icon={<Receipt className="w-4 h-4" />} title="Record expense" description="Attach receipt and tag" />
              <ActionButton icon={<CheckCircle2 className="w-4 h-4" />} title="Approve payroll" description="Review this cycle" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}

function KpiCard({
  title,
  value,
  delta,
  icon,
  positive,
}: {
  title: string
  value: string
  delta: string
  icon: ReactNode
  positive?: boolean
}) {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          <span className="rounded-full bg-amber-50 p-2 text-amber-600">{icon}</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <div className={`text-sm font-medium ${positive ? "text-emerald-600" : "text-muted-foreground"}`}>
          {positive ? <ArrowUpRight className="w-4 h-4 inline mr-1" /> : <ArrowDownRight className="w-4 h-4 inline mr-1" />} {delta}
        </div>
      </CardContent>
    </Card>
  )
}

function ActionButton({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <button className="w-full text-left p-4 border rounded-lg hover:border-amber-200 hover:bg-amber-50 transition group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-200">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </button>
  )
}
