"use client"

import { AdminLayout } from "@/components/dashboard/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  BookOpen,
  Clock,
  Filter,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useEffect } from "react"

const attendanceData = [
  { month: "Sep", rate: 94 },
  { month: "Oct", rate: 96 },
  { month: "Nov", rate: 95 },
  { month: "Dec", rate: 93 },
  { month: "Jan", rate: 95 },
]

const academicPerformance = [
  { grade: "Grade 9", avgScore: 78 },
  { grade: "Grade 10", avgScore: 82 },
  { grade: "Grade 11", avgScore: 85 },
  { grade: "Grade 12", avgScore: 88 },
]

const enrollmentData = [
  { name: "Grade 9", value: 620 },
  { name: "Grade 10", value: 595 },
  { name: "Grade 11", value: 580 },
  { name: "Grade 12", value: 661 },
]

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"]

const reportTypes = [
  {
    id: 1,
    name: "Monthly Attendance Report",
    description: "Comprehensive attendance statistics by class, grade, and individual students",
    category: "Attendance",
    lastGenerated: "Jan 01, 2026",
    frequency: "Monthly",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    id: 2,
    name: "Academic Performance Report",
    description: "Student performance analysis with grade distributions and subject-wise breakdown",
    category: "Academic",
    lastGenerated: "Dec 28, 2025",
    frequency: "Quarterly",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    id: 3,
    name: "Enrollment Statistics",
    description: "Student enrollment trends, admissions, and demographic analysis",
    category: "Enrollment",
    lastGenerated: "Jan 05, 2026",
    frequency: "Annually",
    icon: Users,
    color: "text-purple-600",
  },
  {
    id: 4,
    name: "Teacher Performance Report",
    description: "Teacher workload, student feedback, and professional development tracking",
    category: "Staff",
    lastGenerated: "Dec 20, 2025",
    frequency: "Quarterly",
    icon: Users,
    color: "text-amber-600",
  },
  {
    id: 5,
    name: "Examination Analysis",
    description: "Exam results analysis with pass rates, grade distributions, and subject trends",
    category: "Academic",
    lastGenerated: "Jan 10, 2026",
    frequency: "Per Exam",
    icon: FileText,
    color: "text-red-600",
  },
  {
    id: 6,
    name: "Event Participation Report",
    description: "Student participation in extracurricular activities and school events",
    category: "Activities",
    lastGenerated: "Dec 31, 2025",
    frequency: "Monthly",
    icon: Calendar,
    color: "text-indigo-600",
  },
]

export default function ReportsPage() {
  useEffect(() => {
    document.title = "Reports"
  }, [])

  return (
    <AdminLayout title="Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
            <p className="text-muted-foreground mt-1">Generate and view comprehensive school reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Custom Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground mt-1">156</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground mt-1">24</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-foreground mt-1">8</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold text-foreground mt-1">6</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month"
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
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
                    dataKey="rate" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", r: 5 }}
                    name="Attendance %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Academic Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance by Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={academicPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="grade"
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="avgScore" fill="#10B981" name="Avg Score" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enrollment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={enrollmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {enrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Report Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="academic">Academic Performance</SelectItem>
                      <SelectItem value="enrollment">Enrollment</SelectItem>
                      <SelectItem value="staff">Staff Performance</SelectItem>
                      <SelectItem value="exam">Examination</SelectItem>
                      <SelectItem value="events">Events & Activities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Date Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Grade/Class</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Available Report Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((report) => {
                const Icon = report.icon
                return (
                  <div
                    key={report.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`${report.color} mt-1`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{report.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{report.description}</p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {report.category}
                            </Badge>
                          </div>
                          <span className="text-muted-foreground">{report.frequency}</span>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Last: {report.lastGenerated}
                          </span>
                          <Button size="sm" variant="ghost" className="h-7 text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
