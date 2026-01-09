"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StudentGrades() {
  const grades = [
    { subject: "Mathematics", exam: "Mid Term", grade: "A", percentage: 92 },
    { subject: "Physics", exam: "Mid Term", grade: "A-", percentage: 88 },
    { subject: "Chemistry", exam: "Mid Term", grade: "B+", percentage: 85 },
    { subject: "English", exam: "Mid Term", grade: "A", percentage: 90 },
    { subject: "History", exam: "Quiz", grade: "A", percentage: 95 },
    { subject: "Geography", exam: "Quiz", grade: "B+", percentage: 87 },
  ]

  const getBadgeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Link href="/dashboard/student" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-6">My Grades</h1>

        <Card>
          <CardHeader>
            <CardTitle>Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-muted-foreground">Subject</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Exam Type</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Grade</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted transition">
                      <td className="p-4 font-medium">{item.subject}</td>
                      <td className="p-4 text-muted-foreground">{item.exam}</td>
                      <td className="p-4">
                        <Badge className={`${getBadgeColor(item.grade)} border-0`}>{item.grade}</Badge>
                      </td>
                      <td className="p-4 font-semibold">{item.percentage}%</td>
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
