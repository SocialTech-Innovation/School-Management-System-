"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { BookOpen, TrendingUp, Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function StudentGrades() {
  useEffect(() => {
    document.title = "My Grades - Skops"
  }, [])

  const currentGrades = [
    { subject: "Mathematics", grade: "A", percentage: 92, teacher: "Mr. Anderson" },
    { subject: "Physics", grade: "B+", percentage: 87, teacher: "Ms. Curie" },
    { subject: "Chemistry", grade: "A-", percentage: 90, teacher: "Dr. Mendeleev" },
    { subject: "English Literature", grade: "A", percentage: 94, teacher: "Mrs. Woolf" },
    { subject: "History", grade: "B+", percentage: 86, teacher: "Mr. Churchill" },
    { subject: "Computer Science", grade: "A+", percentage: 98, teacher: "Mr. Gates" },
  ]

  const performanceData = [
    { month: "Aug", grade: 85 },
    { month: "Sep", grade: 87 },
    { month: "Oct", grade: 89 },
    { month: "Nov", grade: 88 },
    { month: "Dec", grade: 91 },
    { month: "Jan", grade: 90 },
  ]

  const gradeBreakdown = [
    { subject: "Mathematics", quizzes: 88, tests: 92, exams: 94, assignments: 90 },
    { subject: "Physics", quizzes: 85, tests: 88, exams: 86, assignments: 89 },
    { subject: "Chemistry", quizzes: 90, tests: 89, exams: 91, assignments: 88 },
  ]

  const gradeColors: Record<string, string> = {
    "A+": "text-success bg-success-light",
    A: "text-success bg-success-light",
    "A-": "text-success bg-success-light",
    "B+": "text-info bg-info-light",
    B: "text-info bg-info-light",
    "B-": "text-warning bg-warning-light",
    C: "text-warning bg-warning-light",
  }

  const getBadgeColor = (grade: string) => gradeColors[grade] || "text-muted-foreground bg-muted"

  return (
    <StudentLayout title="My Grades & Report Cards" showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <span className="status-badge status-success">Excellent</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">A-</p>
            <p className="text-sm text-muted-foreground">Overall GPA</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <span className="status-badge status-info">+3%</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">91.2%</p>
            <p className="text-sm text-muted-foreground">Average Score</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-info-light flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-info" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">6</p>
            <p className="text-sm text-muted-foreground">Total Subjects</p>
          </div>

          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
                <Award className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">2nd</p>
            <p className="text-sm text-muted-foreground">Class Rank</p>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Term</TabsTrigger>
            <TabsTrigger value="breakdown">Grade Breakdown</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Current Term Grades */}
          <TabsContent value="current">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Term Grades</CardTitle>
                    <p className="text-sm text-muted-foreground">Term 1 • 2024-2025</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Subject</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Teacher</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Grade</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentGrades.map((item, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <BookOpen className="w-5 h-5 text-primary" />
                              <span className="font-medium text-foreground">{item.subject}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{item.teacher}</td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getBadgeColor(item.grade)}`}>
                              {item.grade}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-foreground">{item.percentage}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grade Breakdown */}
          <TabsContent value="breakdown">
            <Card>
              <CardHeader>
                <CardTitle>Grade Breakdown by Assessment Type</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed performance across different assessment types</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Subject</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Quizzes</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Tests</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Exams</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Assignments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradeBreakdown.map((item, index) => (
                        <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4 font-medium text-foreground">{item.subject}</td>
                          <td className="py-4 px-4 text-center text-sm">{item.quizzes}%</td>
                          <td className="py-4 px-4 text-center text-sm">{item.tests}%</td>
                          <td className="py-4 px-4 text-center text-sm font-semibold text-primary">{item.exams}%</td>
                          <td className="py-4 px-4 text-center text-sm">{item.assignments}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Chart */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <p className="text-sm text-muted-foreground">Track your academic progress throughout the year</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      stroke="hsl(var(--muted-foreground))"
                      style={{ fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="grade"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
