"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = ["08:30", "09:30", "10:30", "11:30", "12:30", "01:30", "02:30"]

const timetableData: Record<string, Record<string, { subject: string; teacher: string; room: string } | null>> = {
  Monday: {
    "08:30": { subject: "Mathematics", teacher: "Mr. Anderson", room: "101" },
    "09:30": { subject: "Physics", teacher: "Ms. Curie", room: "Lab 3" },
    "10:30": { subject: "Break", teacher: "", room: "" },
    "11:30": { subject: "English", teacher: "Mrs. Woolf", room: "204" },
    "12:30": { subject: "Lunch", teacher: "", room: "" },
    "01:30": { subject: "History", teacher: "Mr. Churchill", room: "302" },
    "02:30": { subject: "Computer Science", teacher: "Mr. Gates", room: "Lab 1" },
  },
  Tuesday: {
    "08:30": { subject: "Chemistry", teacher: "Dr. Mendeleev", room: "Lab 2" },
    "09:30": { subject: "Mathematics", teacher: "Mr. Anderson", room: "101" },
    "10:30": { subject: "Break", teacher: "", room: "" },
    "11:30": { subject: "Physics", teacher: "Ms. Curie", room: "Lab 3" },
    "12:30": { subject: "Lunch", teacher: "", room: "" },
    "01:30": { subject: "English", teacher: "Mrs. Woolf", room: "204" },
    "02:30": { subject: "Art", teacher: "Ms. Picasso", room: "Art Room" },
  },
  Wednesday: {
    "08:30": { subject: "Mathematics", teacher: "Mr. Anderson", room: "101" },
    "09:30": { subject: "Chemistry", teacher: "Dr. Mendeleev", room: "Lab 2" },
    "10:30": { subject: "Break", teacher: "", room: "" },
    "11:30": { subject: "History", teacher: "Mr. Churchill", room: "302" },
    "12:30": { subject: "Lunch", teacher: "", room: "" },
    "01:30": { subject: "Physical Education", teacher: "Coach Smith", room: "Gym" },
    "02:30": { subject: "Computer Science", teacher: "Mr. Gates", room: "Lab 1" },
  },
  Thursday: {
    "08:30": { subject: "English", teacher: "Mrs. Woolf", room: "204" },
    "09:30": { subject: "Physics", teacher: "Ms. Curie", room: "Lab 3" },
    "10:30": { subject: "Break", teacher: "", room: "" },
    "11:30": { subject: "Mathematics", teacher: "Mr. Anderson", room: "101" },
    "12:30": { subject: "Lunch", teacher: "", room: "" },
    "01:30": { subject: "Chemistry", teacher: "Dr. Mendeleev", room: "Lab 2" },
    "02:30": { subject: "Music", teacher: "Mr. Mozart", room: "Music Room" },
  },
  Friday: {
    "08:30": { subject: "Computer Science", teacher: "Mr. Gates", room: "Lab 1" },
    "09:30": { subject: "English", teacher: "Mrs. Woolf", room: "204" },
    "10:30": { subject: "Break", teacher: "", room: "" },
    "11:30": { subject: "Physics", teacher: "Ms. Curie", room: "Lab 3" },
    "12:30": { subject: "Lunch", teacher: "", room: "" },
    "01:30": { subject: "History", teacher: "Mr. Churchill", room: "302" },
    "02:30": { subject: "Mathematics", teacher: "Mr. Anderson", room: "101" },
  },
}

const subjectColors: Record<string, string> = {
  Mathematics: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300",
  Physics: "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-300",
  Chemistry: "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300",
  English: "bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300",
  History: "bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-300",
  "Computer Science": "bg-cyan-100 border-cyan-300 text-cyan-800 dark:bg-cyan-900/30 dark:border-cyan-700 dark:text-cyan-300",
  Art: "bg-pink-100 border-pink-300 text-pink-800 dark:bg-pink-900/30 dark:border-pink-700 dark:text-pink-300",
  Music: "bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300",
  "Physical Education": "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300",
  Break: "bg-muted border-muted text-muted-foreground",
  Lunch: "bg-muted border-muted text-muted-foreground",
}

const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" })

export default function StudentTimetable() {
  useEffect(() => {
    document.title = "My Timetable"
  }, [])

  return (
    <StudentLayout title="My Timetable" showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Weekly Schedule</h2>
            <p className="text-muted-foreground">Class 10-A • Academic Year 2025-2026</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Printer className="w-full sm:w-auto w-4 h-4" />
              Print
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Timetable Grid */}
        <Card className="p-6 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground w-20">Time</th>
                {days.map((day) => (
                  <th
                    key={day}
                    className={`py-3 px-4 text-center text-sm font-medium ${
                      day === currentDay ? "text-primary bg-primary-light rounded-t-lg" : "text-muted-foreground"
                    }`}
                  >
                    {day}
                    {day === currentDay && (
                      <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time} className="border-t border-border">
                  <td className="py-3 px-4 text-sm font-medium text-muted-foreground">{time}</td>
                  {days.map((day) => {
                    const slot = timetableData[day]?.[time]
                    if (!slot) return <td key={day} className="py-3 px-4" />

                    const isBreak = slot.subject === "Break" || slot.subject === "Lunch"

                    return (
                      <td key={day} className="py-2 px-2">
                        <div
                          className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                            subjectColors[slot.subject] || "bg-muted border-muted text-foreground"
                          } ${day === currentDay ? "ring-2 ring-primary/30" : ""}`}
                        >
                          <p className="font-medium text-sm">{slot.subject}</p>
                          {!isBreak && (
                            <>
                              <p className="text-xs opacity-80 mt-1">{slot.teacher}</p>
                              <p className="text-xs opacity-60">{slot.room}</p>
                            </>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Legend */}
        <Card className="p-6">
          <h3 className="section-title mb-4">Subject Color Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(subjectColors)
              .filter(([subject]) => subject !== "Break" && subject !== "Lunch")
              .map(([subject, colorClass]) => (
                <div key={subject} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border ${colorClass}`} />
                  <span className="text-sm text-foreground">{subject}</span>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </StudentLayout>
  )
}
