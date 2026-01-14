"use client"

import { useState } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, TrendingDown, Trophy, Award, Star, BookOpen } from "lucide-react"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

const overallGrade = {
  percentage: 88,
  grade: "A-",
  rank: 5,
  totalStudents: 45,
  gpa: 3.85,
}

const performanceTrend = [
  { month: "Aug", percentage: 85 },
  { month: "Sep", percentage: 87 },
  { month: "Oct", percentage: 84 },
  { month: "Nov", percentage: 89 },
  { month: "Dec", percentage: 91 },
  { month: "Jan", percentage: 88 },
]

const subjectPerformance = [
  { subject: "Mathematics", percentage: 92, grade: "A", trend: "up", color: "blue-500", improvement: "+5%" },
  { subject: "Physics", percentage: 88, grade: "A-", trend: "up", color: "purple-500", improvement: "+3%" },
  { subject: "Chemistry", percentage: 85, grade: "B+", trend: "down", color: "green-500", improvement: "-2%" },
  { subject: "English", percentage: 90, grade: "A", trend: "up", color: "orange-500", improvement: "+4%" },
  { subject: "Computer Science", percentage: 94, grade: "A+", trend: "up", color: "indigo-500", improvement: "+6%" },
  { subject: "Biology", percentage: 82, grade: "B", trend: "neutral", color: "emerald-500", improvement: "0%" },
]

const subjectComparisonData = subjectPerformance.map(s => ({
  subject: s.subject.split(' ')[0], // Short name for chart
  student: s.percentage,
  classAvg: s.percentage - (Math.random() * 10 - 5), // Mock class average
}))

const teacherComments = [
  {
    teacher: "Dr. Smith",
    subject: "Mathematics",
    comment: "Alex shows exceptional problem-solving skills. Strong grasp of calculus concepts.",
    date: "Jan 10, 2026",
    sentiment: "positive",
  },
  {
    teacher: "Prof. Johnson",
    subject: "Physics",
    comment: "Good improvement in understanding mechanics. Needs to focus on electromagnetic theory.",
    date: "Jan 8, 2026",
    sentiment: "neutral",
  },
  {
    teacher: "Ms. Davis",
    subject: "English",
    comment: "Excellent essay writing skills. Very creative and analytical thinking.",
    date: "Jan 5, 2026",
    sentiment: "positive",
  },
]

export default function PerformancePage() {
  const [selectedChild, setSelectedChild] = useState(childrenData[0])

  return (
    <ParentLayout title="Academic Performance" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Overall Performance Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground animate-slide-up">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-4xl font-bold">{overallGrade.grade}</p>
                <p className="text-primary-foreground/80 mt-1">Overall Grade</p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-4xl font-bold">{overallGrade.percentage}%</p>
                <p className="text-primary-foreground/80 mt-1">Average Score</p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-4xl font-bold">#{overallGrade.rank}</p>
                <p className="text-primary-foreground/80 mt-1">Class Rank</p>
              </div>
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <p className="text-4xl font-bold">{overallGrade.gpa}</p>
                <p className="text-primary-foreground/80 mt-1">GPA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend Line Chart */}
          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardHeader>
              <CardTitle>Performance Trend (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month"
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <YAxis 
                    domain={[75, 100]}
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Comparison Bar Chart */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle>Subject Performance vs Class Average</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="subject"
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="student" fill="hsl(var(--primary))" name="Student" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="classAvg" fill="hsl(var(--muted-foreground))" name="Class Avg" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Performance */}
        <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-${subject.color}/10 flex items-center justify-center`}>
                        <BookOpen size={20} className={`text-${subject.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{subject.subject}</p>
                        <p className="text-sm text-muted-foreground">Grade: {subject.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          subject.trend === "up"
                            ? "bg-success text-white"
                            : subject.trend === "down"
                            ? "bg-destructive text-white"
                            : "bg-muted text-foreground"
                        }
                      >
                        {subject.improvement}
                      </Badge>
                      {subject.trend === "up" && <TrendingUp className="text-success" size={20} />}
                      {subject.trend === "down" && <TrendingDown className="text-destructive" size={20} />}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="font-medium text-foreground">{subject.percentage}%</span>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teacher Comments */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle>Teacher Comments & Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherComments.map((comment, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    comment.sentiment === "positive"
                      ? "border-success/20 bg-success/5"
                      : "border-border bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{comment.teacher}</p>
                      <p className="text-sm text-muted-foreground">{comment.subject}</p>
                    </div>
                    <Badge variant="outline">{comment.date}</Badge>
                  </div>
                  <p className="text-sm text-foreground mt-2">{comment.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  )
}
