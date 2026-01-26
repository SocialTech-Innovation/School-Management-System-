"use client"

import { useEffect, useState } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Save, ArrowLeft, AlertCircle, CheckCircle, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface Student {
  id: string
  name: string
  rollNumber: string
  avatar: string
  grade: string
  status: "graded" | "pending"
}

const mockStudents: Student[] = [
  { id: "1", name: "Emma Johnson", rollNumber: "2024001", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", grade: "", status: "pending" },
  { id: "2", name: "Liam Smith", rollNumber: "2024002", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam", grade: "", status: "pending" },
  { id: "3", name: "Olivia Brown", rollNumber: "2024003", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia", grade: "", status: "pending" },
  { id: "4", name: "Noah Williams", rollNumber: "2024004", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah", grade: "", status: "pending" },
  { id: "5", name: "Ava Davis", rollNumber: "2024005", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava", grade: "", status: "pending" },
  { id: "6", name: "Ethan Martinez", rollNumber: "2024006", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan", grade: "", status: "pending" },
]

const assessmentDetails = {
  id: "1",
  title: "Mid-Term Mathematics Exam",
  class: "Class 10-A",
  subject: "Mathematics",
  type: "Exam",
  date: "2024-03-15",
  totalMarks: 100,
}

export default function GradeAssessmentPage({ params }: { params: { assessmentId: string } }) {
  useEffect(() => {
      document.title = "Grade Assessment"
    }, [])
  const router = useRouter()
  const { toast } = useToast()
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGradeChange = (studentId: string, value: string) => {
    // Only allow numbers and empty string
    if (value !== "" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > assessmentDetails.totalMarks)) {
      return
    }

    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, grade: value, status: value !== "" ? "graded" as const : "pending" as const }
        : student
    ))
  }

  const handleSubmit = () => {
    const ungradedStudents = students.filter(s => s.grade === "")
    
    if (ungradedStudents.length > 0) {
      toast({
        title: "Incomplete Grading",
        description: `${ungradedStudents.length} student(s) have not been graded yet.`,
        variant: "destructive"
      })
      return
    }

    setShowConfirmDialog(true)
  }

  const confirmSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create notification with unique ID
    const notification = {
      id: `grade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "grade_submitted",
      title: `${assessmentDetails.class} ${assessmentDetails.type} Submitted`,
      message: `Grades for "${assessmentDetails.title}" have been submitted successfully.`,
      timestamp: new Date().toISOString(),
      class: assessmentDetails.class,
      assessment: assessmentDetails.title,
      isRead: false
    }
    
    // Store notification in localStorage
    const existingNotifications = JSON.parse(localStorage.getItem("teacher_notifications") || "[]")
    existingNotifications.unshift(notification)
    localStorage.setItem("teacher_notifications", JSON.stringify(existingNotifications))
    
    setIsSubmitting(false)
    setShowConfirmDialog(false)
    
    toast({
      title: "Grades Submitted Successfully",
      description: `${assessmentDetails.class} ${assessmentDetails.type} grades have been saved.`,
    })
    
    // Redirect back to assessment page after a short delay
    setTimeout(() => {
      router.push("/dashboard/teacher/assessment")
    }, 1500)
  }

  const gradedCount = students.filter(s => s.status === "graded").length
  const avgGrade = students
    .filter(s => s.grade !== "")
    .reduce((sum, s) => sum + Number(s.grade), 0) / gradedCount || 0

  return (
    <TeacherLayout title="Grade Assessment" showBackButton>
      <div className="space-y-6">
        {/* Assessment Info */}
        <Card className="animate-slide-up">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{assessmentDetails.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{assessmentDetails.class}</Badge>
                  <Badge variant="outline">{assessmentDetails.subject}</Badge>
                  <Badge className="bg-primary">{assessmentDetails.type}</Badge>
                  <Badge variant="outline">Total Marks: {assessmentDetails.totalMarks}</Badge>
                </div>
              </div>
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{students.length}</p>
                </div>
                <FileText className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Graded</p>
                  <p className="text-3xl font-bold text-success">{gradedCount}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-warning">{students.length - gradedCount}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-3xl font-bold text-primary">{avgGrade.toFixed(1)}</p>
                </div>
                <div className="text-2xl font-bold text-muted-foreground">%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grading Spreadsheet */}
        <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Enter Grades</CardTitle>
              <Button onClick={handleSubmit} disabled={gradedCount === 0}>
                <Save className="w-4 h-4 mr-2" />
                Submit Grades
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-foreground w-12">#</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-foreground">Student</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-foreground w-32 whitespace-nowrap">Roll Number</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-foreground w-48">Grade (out of {assessmentDetails.totalMarks})</th>
                      <th className="text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-foreground w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {students.map((student, index) => (
                      <tr 
                        key={student.id} 
                        className={`hover:bg-muted/30 transition-colors animate-slide-up`}
                        style={{ animationDelay: `${300 + index * 30}ms` }}
                      >
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          <span className="text-muted-foreground font-medium">{index + 1}</span>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground truncate max-w-[160px] sm:max-w-none">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                          <Badge variant="outline">{student.rollNumber}</Badge>
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          <Input
                            type="number"
                            min="0"
                            max={assessmentDetails.totalMarks}
                            value={student.grade}
                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                            placeholder="Enter grade"
                            className="w-full"
                          />
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3">
                          {student.status === "graded" ? (
                            <Badge className="bg-success">Graded</Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-info/10 border border-info">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-info mb-1">Important Notes:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Enter grades for all students before submitting</li>
                    <li>Grades must be between 0 and {assessmentDetails.totalMarks}</li>
                    <li>Once submitted, grades cannot be changed</li>
                    <li>A notification will be created upon successful submission</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Grade Submission</AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>You are about to submit grades for:</p>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="font-semibold text-foreground">{assessmentDetails.title}</p>
                  <p className="text-sm text-muted-foreground">{assessmentDetails.class} - {assessmentDetails.subject}</p>
                </div>
                <p className="font-semibold text-destructive">
                  ⚠️ Scores cannot be changed after submission. Do you wish to continue?
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmSubmit}
                disabled={isSubmitting}
                className="bg-primary"
              >
                {isSubmitting ? "Submitting..." : "Yes, Submit Grades"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TeacherLayout>
  )
}
