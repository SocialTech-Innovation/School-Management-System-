"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentProfile() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Link href="/dashboard/student" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6 text-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold">Alex Johnson</h2>
                <p className="text-muted-foreground">Class 10-A</p>
                <p className="text-sm text-muted-foreground mt-2">Student ID: S001</p>
              </CardContent>
            </Card>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">First Name</p>
                    <p className="text-base font-medium">Alex</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Last Name</p>
                    <p className="text-base font-medium">Johnson</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Email</p>
                    <p className="text-base font-medium">alex.johnson@school.edu</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Phone</p>
                    <p className="text-base font-medium">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Date of Birth</p>
                    <p className="text-base font-medium">January 15, 2009</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Gender</p>
                    <p className="text-base font-medium">Male</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Class</p>
                    <p className="text-base font-medium">10-A</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Roll Number</p>
                    <p className="text-base font-medium">12</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Admission Date</p>
                    <p className="text-base font-medium">April 1, 2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Class Teacher</p>
                    <p className="text-base font-medium">Mrs. Anderson</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parent Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Parent/Guardian Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Father</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Name</p>
                      <p className="text-base font-medium">Robert Johnson</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Phone</p>
                      <p className="text-base font-medium">+1 (555) 123-4568</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
