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
import { useState, useEffect } from "react"
import {
  Clock,
  Plus,
  Download,
  Calendar,
  Edit,
  Copy,
  BookOpen,
} from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const periods = [
  { id: 1, time: "08:00 - 08:45" },
  { id: 2, time: "08:50 - 09:35" },
  { id: 3, time: "09:40 - 10:25" },
  { id: 4, time: "10:45 - 11:30" }, // Break before
  { id: 5, time: "11:35 - 12:20" },
  { id: 6, time: "12:25 - 01:10" },
  { id: 7, time: "02:00 - 02:45" }, // Lunch break before
]

const sampleTimetable: Record<string, Record<number, { subject: string; teacher: string; room: string }>> = {
  Monday: {
    1: { subject: "Mathematics", teacher: "Mrs. Anderson", room: "201" },
    2: { subject: "Physics", teacher: "Mr. Johnson", room: "Lab 1" },
    3: { subject: "English", teacher: "Ms. Williams", room: "105" },
    4: { subject: "Chemistry", teacher: "Dr. Brown", room: "Lab 2" },
    5: { subject: "History", teacher: "Mr. Davis", room: "302" },
    6: { subject: "Physical Ed", teacher: "Coach Smith", room: "Gym" },
  },
  Tuesday: {
    1: { subject: "English", teacher: "Ms. Williams", room: "105" },
    2: { subject: "Mathematics", teacher: "Mrs. Anderson", room: "201" },
    3: { subject: "Computer Sci", teacher: "Ms. Garcia", room: "Lab 3" },
    4: { subject: "Physics", teacher: "Mr. Johnson", room: "Lab 1" },
    5: { subject: "Biology", teacher: "Dr. Lee", room: "Lab 4" },
    6: { subject: "Art", teacher: "Mr. Taylor", room: "Studio" },
  },
  Wednesday: {
    1: { subject: "Chemistry", teacher: "Dr. Brown", room: "Lab 2" },
    2: { subject: "History", teacher: "Mr. Davis", room: "302" },
    3: { subject: "Mathematics", teacher: "Mrs. Anderson", room: "201" },
    4: { subject: "English", teacher: "Ms. Williams", room: "105" },
    5: { subject: "Geography", teacher: "Mrs. White", room: "204" },
    6: { subject: "Music", teacher: "Ms. Parker", room: "Music Room" },
  },
  Thursday: {
    1: { subject: "Physics", teacher: "Mr. Johnson", room: "Lab 1" },
    2: { subject: "Computer Sci", teacher: "Ms. Garcia", room: "Lab 3" },
    3: { subject: "Chemistry", teacher: "Dr. Brown", room: "Lab 2" },
    4: { subject: "Mathematics", teacher: "Mrs. Anderson", room: "201" },
    5: { subject: "English", teacher: "Ms. Williams", room: "105" },
    6: { subject: "Physical Ed", teacher: "Coach Smith", room: "Gym" },
  },
  Friday: {
    1: { subject: "History", teacher: "Mr. Davis", room: "302" },
    2: { subject: "Biology", teacher: "Dr. Lee", room: "Lab 4" },
    3: { subject: "Physics", teacher: "Mr. Johnson", room: "Lab 1" },
    4: { subject: "Mathematics", teacher: "Mrs. Anderson", room: "201" },
    5: { subject: "English", teacher: "Ms. Williams", room: "105" },
    6: { subject: "Library", teacher: "Mrs. Evans", room: "Library" },
  },
}

export default function TimetablePage() {
  const [selectedClass, setSelectedClass] = useState("10-A")
  const [selectedView, setSelectedView] = useState<"class" | "teacher">("class")

  useEffect(() => {
      document.title = "Timetable"
    }, [])

  return (
    <AdminLayout title="Timetable">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Timetable Management</h2>
            <p className="text-muted-foreground mt-1">Manage class schedules and periods</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Schedule
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Periods</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{periods.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Working Days</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{days.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Classes</p>
                  <p className="text-2xl font-bold text-foreground mt-1">16</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Break Times</p>
                  <p className="text-2xl font-bold text-foreground mt-1">2</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedView} onValueChange={(v) => setSelectedView(v as "class" | "teacher")}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="View Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class">Class View</SelectItem>
                  <SelectItem value="teacher">Teacher View</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-A">Grade 9-A</SelectItem>
                  <SelectItem value="9-B">Grade 9-B</SelectItem>
                  <SelectItem value="10-A">Grade 10-A</SelectItem>
                  <SelectItem value="10-B">Grade 10-B</SelectItem>
                  <SelectItem value="11-A">Grade 11-A</SelectItem>
                  <SelectItem value="11-B">Grade 11-B</SelectItem>
                  <SelectItem value="12-A">Grade 12-A</SelectItem>
                  <SelectItem value="12-B">Grade 12-B</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="md:ml-auto">
                <Edit className="w-4 h-4 mr-2" />
                Edit Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timetable Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Schedule - {selectedClass}</CardTitle>
              <Badge variant="outline" className="font-medium">Academic Year 2025-2026</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground bg-muted/50 sticky left-0 z-10">
                      Period / Day
                    </th>
                    {days.map((day) => (
                      <th key={day} className="p-3 text-center text-sm font-semibold text-muted-foreground bg-muted/50 min-w-[180px]">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period, idx) => (
                    <>
                      {/* Break rows */}
                      {period.id === 4 && (
                        <tr className="bg-amber-50 border-y-2 border-amber-200">
                          <td className="p-3 text-center font-semibold text-amber-800 sticky left-0 z-10 bg-amber-50">
                            BREAK
                          </td>
                          <td colSpan={5} className="p-3 text-center text-sm text-amber-700">
                            10:25 - 10:45 (20 minutes)
                          </td>
                        </tr>
                      )}
                      {period.id === 7 && (
                        <tr className="bg-amber-50 border-y-2 border-amber-200">
                          <td className="p-3 text-center font-semibold text-amber-800 sticky left-0 z-10 bg-amber-50">
                            LUNCH
                          </td>
                          <td colSpan={5} className="p-3 text-center text-sm text-amber-700">
                            01:10 - 02:00 (50 minutes)
                          </td>
                        </tr>
                      )}
                      
                      <tr key={period.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3 sticky left-0 z-10 bg-background border-r">
                          <div className="text-sm">
                            <p className="font-semibold text-foreground">Period {period.id}</p>
                            <p className="text-xs text-muted-foreground">{period.time}</p>
                          </div>
                        </td>
                        {days.map((day) => {
                          const slot = sampleTimetable[day]?.[period.id]
                          return (
                            <td key={day} className="p-2">
                              {slot ? (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors cursor-pointer">
                                  <p className="font-semibold text-sm text-blue-900">{slot.subject}</p>
                                  <p className="text-xs text-blue-700 mt-1">{slot.teacher}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Badge variant="outline" className="text-xs bg-white">
                                      {slot.room}
                                    </Badge>
                                  </div>
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                  <Plus className="w-4 h-4 text-gray-400 mx-auto" />
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
