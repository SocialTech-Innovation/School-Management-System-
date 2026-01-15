"use client"

import { useEffect } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const classes = [
  { id: "1", name: "Class 10-A", subject: "Mathematics", students: 35, room: "201", schedule: "Mon, Wed, Fri 08:00-09:00", attendance: 94, avgScore: 87 },
  { id: "2", name: "Class 9-B", subject: "Physics", students: 32, room: "305", schedule: "Tue, Thu 09:00-10:00", attendance: 92, avgScore: 85 },
  { id: "3", name: "Class 11-C", subject: "Chemistry", students: 28, room: "308", schedule: "Mon, Wed 10:00-11:00", attendance: 96, avgScore: 89 },
]

export default function TeacherClasses() {
  useEffect(() => {
    document.title = "My Classes"
  }, [])

  return (
    <TeacherLayout title="My Classes" showBackButton>
      <div className="space-y-6 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls, index) => (
            <Link href={`/dashboard/teacher/classes/${cls.id}`} key={cls.id}>
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{cls.name}</h3>
                      <p className="text-sm text-muted-foreground">{cls.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cls.schedule}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{cls.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">{cls.attendance}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{cls.avgScore}</p>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </TeacherLayout>
  )
}
