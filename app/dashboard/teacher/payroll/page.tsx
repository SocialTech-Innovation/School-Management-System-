"use client"

import { useEffect } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, Download, TrendingUp, Calendar, 
  FileText, Eye, CreditCard, Wallet
} from "lucide-react"

const paymentHistory = [
  { id: 1, month: "February 2024", grossSalary: 5500, deductions: 850, netSalary: 4650, paidDate: "Feb 28, 2024", status: "Paid" },
  { id: 2, month: "January 2024", grossSalary: 5500, deductions: 850, netSalary: 4650, paidDate: "Jan 31, 2024", status: "Paid" },
  { id: 3, month: "December 2023", grossSalary: 5500, deductions: 850, netSalary: 4650, paidDate: "Dec 31, 2023", status: "Paid" },
  { id: 4, month: "November 2023", grossSalary: 5500, deductions: 850, netSalary: 4650, paidDate: "Nov 30, 2023", status: "Paid" },
  { id: 5, month: "October 2023", grossSalary: 5500, deductions: 850, netSalary: 4650, paidDate: "Oct 31, 2023", status: "Paid" },
  { id: 6, month: "September 2023", grossSalary: 5500, deductions: 850, netSalary: 4650, paidDate: "Sep 30, 2023", status: "Paid" },
]

export default function TeacherPayroll() {
  useEffect(() => {
    document.title = "Payroll"
  }, [])

  return (
    <TeacherLayout title="Payroll" showBackButton>
      <div className="space-y-6">
        {/* Current Month Salary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Current Month Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-l-4 border-l-primary">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Net Salary</p>
                      <p className="text-4xl font-bold text-foreground">$4,650</p>
                      <p className="text-sm text-muted-foreground mt-1">For March 2024</p>
                    </div>
                    <Badge className="bg-success">Processed</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground mb-1">Basic Salary</p>
                      <p className="text-lg font-bold text-foreground">$4,500</p>
                    </div>
                    <div className="p-4 rounded-lg bg-success-light">
                      <p className="text-xs text-success mb-1">Allowances</p>
                      <p className="text-lg font-bold text-success">+$1,000</p>
                    </div>
                    <div className="p-4 rounded-lg bg-destructive-foreground/10">
                      <p className="text-xs text-destructive mb-1">Deductions</p>
                      <p className="text-lg font-bold text-destructive">-$850</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary-light">
                      <p className="text-xs text-primary mb-1">Net Pay</p>
                      <p className="text-lg font-bold text-primary">$4,650</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Salary Breakdown */}
            <Card className="animate-slide-up mt-6" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle>Salary Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium text-foreground">Basic Salary</span>
                    <span className="font-bold text-foreground">$4,500</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success-light/30">
                    <span className="text-sm text-foreground">House Rent Allowance</span>
                    <span className="font-medium text-success">+$800</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success-light/30">
                    <span className="text-sm text-foreground">Transport Allowance</span>
                    <span className="font-medium text-success">+$150</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success-light/30">
                    <span className="text-sm text-foreground">Performance Bonus</span>
                    <span className="font-medium text-success">+$50</span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-lg font-semibold mb-4">
                      <span className="text-foreground">Gross Salary</span>
                      <span className="text-foreground">$5,500</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive-foreground/10">
                    <span className="text-sm text-muted-foreground">Income Tax (15%)</span>
                    <span className="font-medium text-destructive">-$600</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive-foreground/10">
                    <span className="text-sm text-muted-foreground">Health Insurance</span>
                    <span className="font-medium text-destructive">-$150</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive-foreground/10">
                    <span className="text-sm text-muted-foreground">Pension Contribution</span>
                    <span className="font-medium text-destructive">-$100</span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-lg">Net Salary</span>
                      <span className="text-2xl font-bold text-success">$4,650</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="w-4 h-4" />
                  Download Pay Slip
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Tax Documents
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <CreditCard className="w-4 h-4" />
                  Bank Details
                </Button>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle>YTD Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Total Earned</p>
                  <p className="text-2xl font-bold text-foreground">$27,900</p>
                  <p className="text-xs text-muted-foreground mt-1">Jan - Jun 2024</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Tax Deducted</p>
                  <p className="text-2xl font-bold text-destructive">$5,100</p>
                  <p className="text-xs text-muted-foreground mt-1">15% of gross</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment History */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment History</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Month</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Gross Salary</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Deductions</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Net Salary</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{payment.month}</p>
                            <p className="text-xs text-muted-foreground">Paid on {payment.paidDate}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-foreground">${payment.grossSalary.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-destructive font-medium">-${payment.deductions.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-success">${payment.netSalary.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <Badge className={payment.status === "Paid" ? "bg-success" : "bg-warning"}>
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
          <CardHeader>
            <CardTitle>Tax Information (Year 2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                <p className="text-2xl font-bold text-foreground">$33,000</p>
                <p className="text-xs text-muted-foreground mt-1">Jan - Jun 2024</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Tax Paid</p>
                <p className="text-2xl font-bold text-destructive">$5,100</p>
                <p className="text-xs text-muted-foreground mt-1">15% of gross income</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">Net Income</p>
                <p className="text-2xl font-bold text-success">$27,900</p>
                <p className="text-xs text-muted-foreground mt-1">After deductions</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-foreground mb-4">Tax Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Form W-2 - 2024</p>
                      <p className="text-xs text-muted-foreground">Wage & Tax Statement</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                      <FileText className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tax Summary</p>
                      <p className="text-xs text-muted-foreground">2024 YTD</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  )
}
