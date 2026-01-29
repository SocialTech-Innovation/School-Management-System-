"use client"

import { useState, useEffect } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, User, BookOpen, Coffee } from "lucide-react"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

const subjectColors: { [key: string]: string } = {
  Mathematics: "blue-500",
  Physics: "purple-500",
  Chemistry: "green-500",
  English: "orange-500",
  "Computer Science": "indigo-500",
  Biology: "emerald-500",
  History: "amber-500",
  "Physical Education": "pink-500",
}

const timetableData = {
  Monday: [
    { time: "8:00 - 9:00", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
    { time: "9:00 - 10:00", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201" },
    { time: "10:00 - 10:15", subject: "Break", teacher: "", room: "" },
    { time: "10:15 - 11:15", subject: "Chemistry", teacher: "Dr. Williams", room: "Lab 202" },
    { time: "11:15 - 12:15", subject: "English", teacher: "Ms. Davis", room: "Room 105" },
    { time: "12:15 - 1:00", subject: "Lunch", teacher: "", room: "" },
    { time: "1:00 - 2:00", subject: "Computer Science", teacher: "Mr. Brown", room: "Computer Lab" },
    { time: "2:00 - 3:00", subject: "Biology", teacher: "Dr. Taylor", room: "Lab 203" },
  ],
  Tuesday: [
    { time: "8:00 - 9:00", subject: "Chemistry", teacher: "Dr. Williams", room: "Lab 202" },
    { time: "9:00 - 10:00", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
    { time: "10:00 - 10:15", subject: "Break", teacher: "", room: "" },
    { time: "10:15 - 11:15", subject: "English", teacher: "Ms. Davis", room: "Room 105" },
    { time: "11:15 - 12:15", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201" },
    { time: "12:15 - 1:00", subject: "Lunch", teacher: "", room: "" },
    { time: "1:00 - 2:00", subject: "Biology", teacher: "Dr. Taylor", room: "Lab 203" },
    { time: "2:00 - 3:00", subject: "Physical Education", teacher: "Coach Wilson", room: "Sports Ground" },
  ],
  Wednesday: [
    { time: "8:00 - 9:00", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201" },
    { time: "9:00 - 10:00", subject: "Computer Science", teacher: "Mr. Brown", room: "Computer Lab" },
    { time: "10:00 - 10:15", subject: "Break", teacher: "", room: "" },
    { time: "10:15 - 11:15", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
    { time: "11:15 - 12:15", subject: "Biology", teacher: "Dr. Taylor", room: "Lab 203" },
    { time: "12:15 - 1:00", subject: "Lunch", teacher: "", room: "" },
    { time: "1:00 - 2:00", subject: "English", teacher: "Ms. Davis", room: "Room 105" },
    { time: "2:00 - 3:00", subject: "History", teacher: "Prof. Anderson", room: "Room 108" },
  ],
  Thursday: [
    { time: "8:00 - 9:00", subject: "English", teacher: "Ms. Davis", room: "Room 105" },
    { time: "9:00 - 10:00", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
    { time: "10:00 - 10:15", subject: "Break", teacher: "", room: "" },
    { time: "10:15 - 11:15", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201" },
    { time: "11:15 - 12:15", subject: "Chemistry", teacher: "Dr. Williams", room: "Lab 202" },
    { time: "12:15 - 1:00", subject: "Lunch", teacher: "", room: "" },
    { time: "1:00 - 2:00", subject: "Computer Science", teacher: "Mr. Brown", room: "Computer Lab" },
    { time: "2:00 - 3:00", subject: "Physical Education", teacher: "Coach Wilson", room: "Sports Ground" },
  ],
  Friday: [
    { time: "8:00 - 9:00", subject: "Computer Science", teacher: "Mr. Brown", room: "Computer Lab" },
    { time: "9:00 - 10:00", subject: "Biology", teacher: "Dr. Taylor", room: "Lab 203" },
    { time: "10:00 - 10:15", subject: "Break", teacher: "", room: "" },
    { time: "10:15 - 11:15", subject: "Chemistry", teacher: "Dr. Williams", room: "Lab 202" },
    { time: "11:15 - 12:15", subject: "History", teacher: "Prof. Anderson", room: "Room 108" },
    { time: "12:15 - 1:00", subject: "Lunch", teacher: "", room: "" },
    { time: "1:00 - 2:00", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
    { time: "2:00 - 3:00", subject: "English", teacher: "Ms. Davis", room: "Room 105" },
  ],
}

export default function TimetablePage() {
  useEffect(() => {
      document.title = "Class Timetable"
    }, [])
  const [selectedChild, setSelectedChild] = useState(childrenData[0])
  const [selectedDay, setSelectedDay] = useState<keyof typeof timetableData>("Monday")

  return (
    <ParentLayout title="Class Timetable" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Info Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground animate-slide-up">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold">{selectedChild.class}</h3>
                <p className="text-primary-foreground/80">Academic Year 2025-2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day Selector */}
        <Tabs
          value={selectedDay}
          onValueChange={(value) => setSelectedDay(value as keyof typeof timetableData)}
          className="animate-slide-up"
          style={{ animationDelay: "50ms" }}
        >
          <TabsList className="flex w-full gap-2 overflow-x-auto p-1 rounded-md bg-muted">
            {Object.keys(timetableData).map((day) => (
              <TabsTrigger
          key={day}
          value={day}
          className="min-w-[90px] shrink-0 rounded-md px-3 py-2 text-sm"
              >
          {day}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(timetableData).map(([day, schedule]) => (
            <TabsContent key={day} value={day} className="mt-4 sm:mt-6">
              {/* color map for inline styles to ensure responsive and consistent rendering */}
              {(() => {
          const tailwindHex: Record<string, string> = {
            "blue-500": "#3B82F6",
            "purple-500": "#A855F7",
            "green-500": "#22C55E",
            "orange-500": "#F97316",
            "indigo-500": "#6366F1",
            "emerald-500": "#10B981",
            "amber-500": "#F59E0B",
            "pink-500": "#EC4899",
            "gray-500": "#6B7280",
          }

          return (
            <div className="space-y-3">
              {schedule.map((slot, index) => {
                const isBreak = slot.subject === "Break" || slot.subject === "Lunch"
                const colorKey = subjectColors[slot.subject] || "gray-500"
                const colorHex = tailwindHex[colorKey] || "#6B7280"

                return (
            <Card
              key={`${day}-${index}`}
              className={`transition-shadow hover:shadow-md ${
                isBreak ? "bg-muted/50 border-dashed" : ""
              }`}
              style={!isBreak ? { borderLeft: `4px solid ${colorHex}` } : undefined}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1">
              {/* Subject / Break */}
              {!isBreak ? (
                <div className="flex items-start sm:items-center gap-3">
                  <BookOpen size={18} style={{ color: colorHex }} />
                  <div>
                    <h4 className="font-semibold text-foreground">{slot.subject}</h4>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{slot.teacher}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{slot.room}</span>
                </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Coffee size={18} className="text-muted-foreground" />
                  <h4 className="font-semibold text-muted-foreground">{slot.subject}</h4>
                </div>
              )}

              {/* Time */}
              <div className="mt-2 sm:mt-0 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                <span className="font-medium text-foreground">{slot.time}</span>
              </div>
                  </div>

                  {/* Status Badge */}
                  {!isBreak && (
              <Badge
                variant="outline"
                className="self-start sm:self-center"
                style={{ borderColor: colorHex, color: colorHex }}
              >
                {slot.subject.split(" ")[0]}
              </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
                )
              })}
            </div>
          )
              })()}
            </TabsContent>
          ))}
        </Tabs>

        {/* Legend */}
        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Subject Color Legend</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const tailwindHex: Record<string, string> = {
          "blue-500": "#3B82F6",
          "purple-500": "#A855F7",
          "green-500": "#22C55E",
          "orange-500": "#F97316",
          "indigo-500": "#6366F1",
          "emerald-500": "#10B981",
          "amber-500": "#F59E0B",
          "pink-500": "#EC4899",
          "gray-500": "#6B7280",
              }

              return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(subjectColors).map(([subject, colorKey]) => {
              const hex = tailwindHex[colorKey] || "#6B7280"
              return (
                <div key={subject} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: hex }}></div>
            <span className="text-sm text-foreground">{subject}</span>
                </div>
              )
            })}
          </div>
              )
            })()}
          </CardContent>
        </Card>

        {/* Quick Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">7 hours</p>
              <p className="text-sm text-muted-foreground">School Hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">6-7</p>
              <p className="text-sm text-muted-foreground">Subjects per Day</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Coffee className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground">Breaks</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ParentLayout>
  )
}
