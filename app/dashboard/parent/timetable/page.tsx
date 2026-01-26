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
        <Tabs value={selectedDay} onValueChange={(value) => setSelectedDay(value as keyof typeof timetableData)} className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="Monday">Monday</TabsTrigger>
            <TabsTrigger value="Tuesday">Tuesday</TabsTrigger>
            <TabsTrigger value="Wednesday">Wednesday</TabsTrigger>
            <TabsTrigger value="Thursday">Thursday</TabsTrigger>
            <TabsTrigger value="Friday">Friday</TabsTrigger>
          </TabsList>

          {Object.entries(timetableData).map(([day, schedule]) => (
            <TabsContent key={day} value={day} className="mt-6">
              <div className="space-y-3">
                {schedule.map((slot, index) => {
                  const isBreak = slot.subject === "Break" || slot.subject === "Lunch"
                  const subjectColor = subjectColors[slot.subject] || "gray-500"

                  return (
                    <Card
                      key={index}
                      className={`hover:shadow-md transition-shadow ${
                        isBreak ? "bg-muted/50 border-dashed" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            {/* Time */}
                            <div className="flex items-center gap-2 min-w-[120px]">
                              <Clock size={16} className="text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{slot.time}</span>
                            </div>

                            {/* Subject */}
                            {!isBreak ? (
                              <>
                                <div className={`w-1 h-12 rounded-full bg-${subjectColor}`}></div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <BookOpen size={18} className={`text-${subjectColor}`} />
                                    <h4 className="font-semibold text-foreground">{slot.subject}</h4>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                              </>
                            ) : (
                              <div className="flex items-center gap-2 flex-1">
                                <Coffee size={18} className="text-muted-foreground" />
                                <h4 className="font-semibold text-muted-foreground">{slot.subject}</h4>
                              </div>
                            )}
                          </div>

                          {/* Status Badge */}
                          {!isBreak && (
                            <Badge variant="outline" className={`border-${subjectColor} text-${subjectColor}`}>
                              {slot.subject.split(' ')[0]}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Legend */}
        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle>Subject Color Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(subjectColors).map(([subject, color]) => (
                <div key={subject} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-${color}`}></div>
                  <span className="text-sm text-foreground">{subject}</span>
                </div>
              ))}
            </div>
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
