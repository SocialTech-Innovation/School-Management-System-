"use client"

import { useState } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CreditCard, Download, CheckCircle, Clock, Receipt, DollarSign, Calendar } from "lucide-react"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

const paymentStatus = {
  status: "pending", // "paid" or "pending"
  outstandingAmount: 450,
  dueDate: "Feb 15, 2026",
  termFee: 1350,
  lastPayment: {
    amount: 1350,
    date: "Oct 5, 2025",
    method: "Credit Card",
  },
}

const feeStructure = [
  { category: "Tuition Fee", term1: 800, term2: 800, term3: 800, total: 2400 },
  { category: "Lab Fee", term1: 100, term2: 100, term3: 100, total: 300 },
  { category: "Library Fee", term1: 50, term2: 50, term3: 50, total: 150 },
  { category: "Sports Fee", term1: 75, term2: 75, term3: 75, total: 225 },
  { category: "Technology Fee", term1: 150, term2: 150, term3: 150, total: 450 },
  { category: "Activity Fee", term1: 75, term2: 75, term3: 75, total: 225 },
]

const totalPerTerm = feeStructure.reduce((acc, item) => acc + item.term1, 0)

const paymentHistory = [
  {
    id: "INV-2025-003",
    date: "Oct 5, 2025",
    description: "Term 1 Fee Payment",
    amount: 1350,
    method: "Credit Card",
    status: "paid",
  },
  {
    id: "INV-2025-002",
    date: "Jun 12, 2025",
    description: "Annual Fee Payment",
    amount: 2700,
    method: "Bank Transfer",
    status: "paid",
  },
  {
    id: "INV-2025-001",
    date: "Feb 8, 2025",
    description: "Term 3 Fee Payment (2024-2025)",
    amount: 1350,
    method: "Credit Card",
    status: "paid",
  },
]

export default function FeesPage() {
  const [selectedChild, setSelectedChild] = useState(childrenData[0])

  return (
    <ParentLayout title="Fee Management" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Payment Alert */}
        {paymentStatus.status === "pending" && (
          <Card className="border-warning bg-warning/5 animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Payment Due</h3>
                  <p className="text-sm text-muted-foreground">
                    Term 2 fee payment of ${paymentStatus.outstandingAmount} is due by{" "}
                    <span className="font-medium text-foreground">{paymentStatus.dueDate}</span>
                  </p>
                  <Button className="mt-3" size="sm">
                    Pay Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fee Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`animate-slide-up ${paymentStatus.status === "paid" ? "bg-gradient-to-br from-success to-success/80 text-white" : "bg-gradient-to-br from-warning to-warning/80 text-white"}`}>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm opacity-90 mb-1">Payment Status</p>
              <p className="text-2xl font-bold capitalize">{paymentStatus.status}</p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <DollarSign size={24} className="text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${paymentStatus.outstandingAmount}</p>
                <p className="text-sm text-muted-foreground">Outstanding</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Receipt size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${paymentStatus.termFee}</p>
                <p className="text-sm text-muted-foreground">Term Fee</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Calendar size={24} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${paymentStatus.lastPayment.amount}</p>
                <p className="text-sm text-muted-foreground">Last Payment</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fee Structure */}
          <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle>Annual Fee Structure (2025-2026)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Category</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Term 1</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Term 2</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Term 3</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((item, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-3 px-4 text-sm text-foreground">{item.category}</td>
                        <td className="text-right py-3 px-4 text-sm text-muted-foreground">${item.term1}</td>
                        <td className="text-right py-3 px-4 text-sm text-muted-foreground">${item.term2}</td>
                        <td className="text-right py-3 px-4 text-sm text-muted-foreground">${item.term3}</td>
                        <td className="text-right py-3 px-4 text-sm font-semibold text-foreground">${item.total}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50 font-semibold">
                      <td className="py-3 px-4 text-sm text-foreground">Total Per Term</td>
                      <td className="text-right py-3 px-4 text-sm text-foreground">${totalPerTerm}</td>
                      <td className="text-right py-3 px-4 text-sm text-foreground">${totalPerTerm}</td>
                      <td className="text-right py-3 px-4 text-sm text-foreground">${totalPerTerm}</td>
                      <td className="text-right py-3 px-4 text-sm text-foreground">${totalPerTerm * 3}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start gap-3" size="lg">
                  <CreditCard size={20} />
                  Make Payment
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                  <Download size={20} />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                  <Clock size={20} />
                  Payment History
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3" size="lg">
                  <Receipt size={20} />
                  Fee Receipt
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment Method</span>
                  <span className="text-sm font-medium text-foreground">{paymentStatus.lastPayment.method}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Payment</span>
                  <span className="text-sm font-medium text-foreground">{paymentStatus.lastPayment.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Due Date</span>
                  <span className="text-sm font-medium text-foreground">{paymentStatus.dueDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <CheckCircle size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">${payment.amount}</p>
                      <Badge className="bg-success text-white mt-1">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>Invoice: {payment.id}</span>
                    <span>•</span>
                    <span>Method: {payment.method}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  )
}
