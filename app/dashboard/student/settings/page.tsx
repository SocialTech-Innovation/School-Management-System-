"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { Bell, Mail, Phone, Lock, Globe, Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function StudentSettings() {
  useEffect(() => {
    document.title = "Settings"
  }, [])

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [gradeAlerts, setGradeAlerts] = useState(true)
  const [attendanceAlerts, setAttendanceAlerts] = useState(true)
  const [announcementAlerts, setAnnouncementAlerts] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <StudentLayout title="Settings" showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-base font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications" className="text-base font-medium">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-base font-medium">Alert Types</Label>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="grade-alerts" className="text-sm font-medium">
                    Grade Updates
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when grades are posted
                  </p>
                </div>
                <Switch
                  id="grade-alerts"
                  checked={gradeAlerts}
                  onCheckedChange={setGradeAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="attendance-alerts" className="text-sm font-medium">
                    Attendance Alerts
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified about attendance records
                  </p>
                </div>
                <Switch
                  id="attendance-alerts"
                  checked={attendanceAlerts}
                  onCheckedChange={setAttendanceAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="announcement-alerts" className="text-sm font-medium">
                    Announcements
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified about new announcements
                  </p>
                </div>
                <Switch
                  id="announcement-alerts"
                  checked={announcementAlerts}
                  onCheckedChange={setAnnouncementAlerts}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <CardTitle>Contact Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="secondary-email">Secondary Email</Label>
              <Input
                id="secondary-email"
                type="email"
                placeholder="secondary@email.com"
                defaultValue=""
              />
              <p className="text-xs text-muted-foreground">
                Add a secondary email for important notifications
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary-phone">Secondary Phone Number</Label>
              <Input
                id="secondary-phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                defaultValue=""
              />
              <p className="text-xs text-muted-foreground">
                Add a secondary phone number for SMS alerts
              </p>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Contact Information
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base font-medium">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-muted-foreground" />
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Moon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle>Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Password</Label>
              <p className="text-sm text-muted-foreground mb-3">
                For security reasons, password changes must be requested through your school administrator.
              </p>
              <Button variant="outline" className="w-full">
                Request Password Change
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
