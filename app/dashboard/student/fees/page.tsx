"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { CreditCard, Clock, CheckCircle, Download, AlertCircle, TrendingUp, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const feeStatus = {
  totalFee: 6000,
  paid: 1000,
  pending: 5000,
  dueDate: "March 10, 2026",
}

const paymentHistory = [
  { id: "PAY-2026-002", date: "Feb 5, 2026", amount: 500, method: "Bank Transfer", status: "Completed" },
  { id: "PAY-2026-001", date: "Jan 8, 2026", amount: 500, method: "Credit Card", status: "Completed" },
]

const feeStructure = [
  { item: "Tuition Fee", amount: 4000, paid: 667 },
  { item: "Lab Fee", amount: 600, paid: 100 },
  { item: "Library Fee", amount: 400, paid: 67 },
  { item: "Sports Fee", amount: 500, paid: 83 },
  { item: "Technology Fee", amount: 300, paid: 50 },
  { item: "Exam Fee", amount: 200, paid: 33 },
]

export default function StudentFees() {
  const paidPercentage = Math.round((feeStatus.paid / feeStatus.totalFee) * 100)

  return (
    <StudentLayout title="Fee Status" showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">${feeStatus.totalFee.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Fee</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
            </div>
            <p className="text-3xl font-bold text-success mb-1">${feeStatus.paid.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Amount Paid</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="text-3xl font-bold text-warning mb-1">${feeStatus.pending.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Pending Amount</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-info-light flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-info" />
              </div>
              <span className={`status-badge ${paidPercentage >= 80 ? 'status-success' : paidPercentage >= 50 ? 'status-warning' : 'status-error'}`}>
                {paidPercentage >= 80 ? 'Good' : paidPercentage >= 50 ? 'Fair' : 'Low'}
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{paidPercentage}%</p>
            <p className="text-sm text-muted-foreground">Paid Percentage</p>
          </div>
        </div>

        {/* Payment Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Payment Progress</span>
              <span className="text-sm font-normal text-muted-foreground">Academic Year 2025-2026</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold text-foreground">{paidPercentage}% Complete</span>
              </div>
              <Progress value={paidPercentage} className="h-3" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>${feeStatus.paid.toLocaleString()} paid</span>
                <span>${feeStatus.pending.toLocaleString()} remaining</span>
              </div>
            </div>

            {/* Payment Due Alert */}
            {feeStatus.pending > 0 && (
              <div className="p-4 bg-warning-light border border-warning/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Payment Due</p>
                    <p className="text-sm text-muted-foreground">
                      ${feeStatus.pending.toLocaleString()} due by {feeStatus.dueDate}
                    </p>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Pay Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentHistory.map((payment, index) => (
                <div key={payment.id} className="relative">
                  {/* Timeline connector */}
                  {index < paymentHistory.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
                  )}
                  
                  <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-success-light flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-foreground">{payment.id}</p>
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80 flex-shrink-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{payment.method}</span>
                        <span className="text-lg font-bold text-foreground">${payment.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Fee Structure */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feeStructure.map((fee, index) => {
                const percentage = Math.round((fee.paid / fee.amount) * 100)
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{fee.item}</span>
                      <span className="text-muted-foreground">${fee.paid.toLocaleString()} / ${fee.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-primary/20">
                <span className="font-semibold text-foreground">Total</span>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">${feeStatus.totalFee.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">${feeStatus.paid.toLocaleString()} paid</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  )
}
