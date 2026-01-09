"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function StudentFees() {
  const feeHistory = [
    { month: "January", amount: 500, status: "Paid", dueDate: "Jan 10, 2024" },
    { month: "February", amount: 500, status: "Paid", dueDate: "Feb 10, 2024" },
    { month: "March", amount: 500, status: "Pending", dueDate: "Mar 10, 2024" },
    { month: "April", amount: 500, status: "Pending", dueDate: "Apr 10, 2024" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Link href="/dashboard/student" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-6">Fee Status</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Due</p>
              <p className="text-3xl font-bold">$1,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
              <p className="text-3xl font-bold">$1,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Outstanding</p>
              <p className="text-3xl font-bold text-red-600">$1,000</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fee Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-muted-foreground">Month</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Amount</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Due Date</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feeHistory.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted transition">
                      <td className="p-4 font-medium">{item.month}</td>
                      <td className="p-4">${item.amount}</td>
                      <td className="p-4">
                        <Badge
                          className={`${
                            item.status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          } border-0`}
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">{item.dueDate}</td>
                      <td className="p-4">
                        {item.status === "Pending" ? (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Pay Now
                          </Button>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
