"use client"

import { useState, useEffect } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { 
  User, Mail, Phone, MapPin, Lock, Bell, Eye, Camera, Save, Shield
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

export default function ProfileSettingsPage() {
  useEffect(() => {
      document.title = "Profile Settings"
    }, [])
  const { toast } = useToast()
  const [selectedChild, setSelectedChild] = useState(childrenData[0])
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'parent@school.edu',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    emergencyContact: '+1 (555) 987-6543',
    relation: 'Mother',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    attendanceAlerts: true,
    gradeUpdates: true,
    feeReminders: true,
    announcementNotifications: true,
    messageNotifications: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    shareContactInfo: false,
  })

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy settings have been saved.",
    })
  }

  return (
    <ParentLayout title="Profile Settings" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Profile Information */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src="" alt="Sarah Johnson" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">SJ</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary"
                >
                  <Camera size={16} />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Parent Account</p>
                <Button variant="outline" size="sm" className="w-full sm:w-auto mt-2">
                  Change Photo
                </Button>
              </div>
            </div>

            <Separator />

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-9"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    className="pl-9"
                    rows={2}
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="relation">Relation to Student</Label>
                <Select value={profileData.relation} onValueChange={(val) => setProfileData({ ...profileData, relation: val })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="emergencyContact"
                    type="tel"
                    className="pl-9"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} className="bg-primary">
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Change Password</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Keep your account secure by using a strong password
              </p>
              <Button variant="outline">
                <Lock size={16} className="mr-2" />
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline">
                <Shield size={16} className="mr-2" />
                Enable 2FA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(val) => setNotificationSettings({ ...notificationSettings, emailNotifications: val })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <Switch
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(val) => setNotificationSettings({ ...notificationSettings, smsNotifications: val })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Attendance Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified about attendance updates</p>
              </div>
              <Switch
                checked={notificationSettings.attendanceAlerts}
                onCheckedChange={(val) => setNotificationSettings({ ...notificationSettings, attendanceAlerts: val })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Grade Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified when grades are posted</p>
              </div>
              <Switch
                checked={notificationSettings.gradeUpdates}
                onCheckedChange={(val) => setNotificationSettings({ ...notificationSettings, gradeUpdates: val })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Fee Reminders</Label>
                <p className="text-sm text-muted-foreground">Receive reminders about upcoming payments</p>
              </div>
              <Switch
                checked={notificationSettings.feeReminders}
                onCheckedChange={(val) => setNotificationSettings({ ...notificationSettings, feeReminders: val })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Announcements</Label>
                <p className="text-sm text-muted-foreground">Get notified about school announcements</p>
              </div>
              <Switch
                checked={notificationSettings.announcementNotifications}
                onCheckedChange={(val) => setNotificationSettings({ ...notificationSettings, announcementNotifications: val })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Teacher Messages</Label>
                <p className="text-sm text-muted-foreground">Get notified about new messages from teachers</p>
              </div>
              <Switch
                checked={notificationSettings.messageNotifications}
                onCheckedChange={(val) => setNotificationSettings({ ...notificationSettings, messageNotifications: val })}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveNotifications} className="bg-primary">
                <Save size={16} className="mr-2" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Visibility</Label>
              <Select value={privacySettings.profileVisibility} onValueChange={(val) => setPrivacySettings({ ...privacySettings, profileVisibility: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private (Only school staff)</SelectItem>
                  <SelectItem value="limited">Limited (School staff and teachers)</SelectItem>
                  <SelectItem value="public">Public (All parents and staff)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Share Contact Information</Label>
                <p className="text-sm text-muted-foreground">Allow other parents to see your contact info</p>
              </div>
              <Switch
                checked={privacySettings.shareContactInfo}
                onCheckedChange={(val) => setPrivacySettings({ ...privacySettings, shareContactInfo: val })}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSavePrivacy} className="bg-primary">
                <Save size={16} className="mr-2" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  )
}
