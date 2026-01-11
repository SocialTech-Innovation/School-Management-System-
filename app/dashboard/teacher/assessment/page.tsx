"use client"

import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { 
  FileText, Plus, Clock, Users, CheckCircle, AlertCircle,
  Calendar, BookOpen, TrendingUp, Eye, Edit, Trash2
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const assessmentsData = {
  upcoming: [
    {
      id: 1,
      title: "Mid-Term Mathematics Exam",
      class: "Class 10-A",
      subject: "Mathematics",
      type: "Exam",
      date: "2024-03-15",
      duration: "2 hours",
      totalMarks: 100,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Physics Quiz - Chapter 5",
      class: "Class 9-B",
      subject: "Physics",
      type: "Quiz",
      date: "2024-03-10",
      duration: "30 mins",
      totalMarks: 25,
      status: "upcoming"
    },
  ],
  active: [
    {
      id: 3,
      title: "Chemistry Practical Test",
      class: "Class 11-C",
      subject: "Chemistry",
      type: "Practical",
      date: "2024-03-08",
      duration: "1 hour",
      totalMarks: 50,
      submissions: 18,
      totalStudents: 25,
      status: "active"
    },
    {
      id: 4,
      title: "Math Assignment - Calculus",
      class: "Class 10-B",
      subject: "Mathematics",
      type: "Assignment",
      date: "2024-03-07",
      duration: "N/A",
      totalMarks: 30,
      submissions: 22,
      totalStudents: 28,
      status: "active"
    },
  ],
  graded: [
    {
      id: 5,
      title: "Physics Mid-Term",
      class: "Class 9-B",
      subject: "Physics",
      type: "Exam",
      date: "2024-02-28",
      totalMarks: 100,
      avgScore: 78,
      highestScore: 95,
      lowestScore: 52,
      status: "graded"
    },
    {
      id: 6,
      title: "Chemistry Quiz",
      class: "Class 11-C",
      subject: "Chemistry",
      type: "Quiz",
      date: "2024-02-25",
      totalMarks: 20,
      avgScore: 16,
      highestScore: 20,
      lowestScore: 12,
      status: "graded"
    },
  ]
}

export default function TeacherAssessment() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <TeacherLayout title="Assessment" showBackButton>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Assessments</p>
                  <p className="text-3xl font-bold text-foreground">
                    {assessmentsData.upcoming.length + assessmentsData.active.length + assessmentsData.graded.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Grading</p>
                  <p className="text-3xl font-bold text-warning">{assessmentsData.active.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-3xl font-bold text-success">81%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success-light flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-foreground">{assessmentsData.graded.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-info-light flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessments Tabs */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assessments</CardTitle>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Assessment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g., Mid-Term Exam" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="assignment">Assignment</SelectItem>
                            <SelectItem value="practical">Practical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class">Class</Label>
                        <Select>
                          <SelectTrigger id="class">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10a">Class 10-A</SelectItem>
                            <SelectItem value="9b">Class 9-B</SelectItem>
                            <SelectItem value="11c">Class 11-C</SelectItem>
                            <SelectItem value="10b">Class 10-B</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" placeholder="e.g., 2 hours" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="marks">Total Marks</Label>
                        <Input id="marks" type="number" placeholder="100" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Add details about the assessment..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>Create Assessment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="upcoming">
                  Upcoming ({assessmentsData.upcoming.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({assessmentsData.active.length})
                </TabsTrigger>
                <TabsTrigger value="graded">
                  Graded ({assessmentsData.graded.length})
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Assessments */}
              <TabsContent value="upcoming" className="space-y-4">
                {assessmentsData.upcoming.map((assessment) => (
                  <Card key={assessment.id} className="border-l-4 border-l-info">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{assessment.title}</h3>
                            <Badge variant="outline" className="bg-info-light text-info">{assessment.type}</Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {assessment.class} - {assessment.subject}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {assessment.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">Total Marks: {assessment.totalMarks}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Active Assessments */}
              <TabsContent value="active" className="space-y-4">
                {assessmentsData.active.map((assessment) => (
                  <Card key={assessment.id} className="border-l-4 border-l-warning">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{assessment.title}</h3>
                            <Badge variant="outline" className="bg-warning-light text-warning">{assessment.type}</Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {assessment.class} - {assessment.subject}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-sm font-medium text-foreground">Total Marks: {assessment.totalMarks}</span>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">
                                {assessment.submissions}/{assessment.totalStudents} submitted
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${(assessment.submissions / assessment.totalStudents) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/dashboard/teacher/assessment/grade/${assessment.id}`}>
                            <Button variant="default" size="sm" className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Grade Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Graded Assessments */}
              <TabsContent value="graded" className="space-y-4">
                {assessmentsData.graded.map((assessment) => (
                  <Card key={assessment.id} className="border-l-4 border-l-success">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{assessment.title}</h3>
                            <Badge variant="outline" className="bg-success-light text-success">{assessment.type}</Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {assessment.class} - {assessment.subject}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-4 mt-3">
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
                              <p className="text-xl font-bold text-success">{assessment.avgScore}%</p>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Highest</p>
                              <p className="text-xl font-bold text-foreground">{assessment.highestScore}</p>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Lowest</p>
                              <p className="text-xl font-bold text-foreground">{assessment.lowestScore}</p>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Total Marks</p>
                              <p className="text-xl font-bold text-foreground">{assessment.totalMarks}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Report
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  )
}
