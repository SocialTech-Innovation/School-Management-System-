"use client"

import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  User, Mail, Phone, MapPin, Calendar, BookOpen, 
  Award, Edit, Save, X, Building2, GraduationCap
} from "lucide-react"
import { useEffect, useState } from "react"

const teacherData = {
  name: "Prof. Sarah Anderson",
  employeeId: "TCH-2024-001",
  email: "teacher@school.edu",
  phone: "+1 (555) 123-4567",
  address: "456 Academic Avenue, Springfield, IL 62701",
  department: "Science & Mathematics",
  designation: "Senior Teacher",
  subjects: ["Mathematics", "Physics", "Chemistry"],
  dateOfJoining: "September 1, 2018",
  qualification: "M.Sc. in Mathematics, B.Ed.",
  experience: "8 years",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  bio: "Passionate educator with over 8 years of experience in teaching Mathematics and Sciences. Committed to fostering critical thinking and problem-solving skills in students.",
  achievements: [
    "Best Teacher Award 2023",
    "Published 5 research papers",
    "Mentor for Science Olympiad Team"
  ]
}

export default function TeacherProfile() {
  useEffect(() => {
      document.title = "My Profile"
    }, [])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(teacherData)

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(teacherData)
    setIsEditing(false)
  }

  return (
    <TeacherLayout title="My Profile" showBackButton>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="animate-slide-up">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={formData.avatar} />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">SA</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">{formData.name}</h2>
                    <p className="text-muted-foreground mb-3">{formData.designation}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-primary-light text-primary">
                        {formData.department}
                      </Badge>
                      <Badge variant="outline">ID: {formData.employeeId}</Badge>
                    </div>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{formData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{formData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm md:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">{formData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-2xl font-bold text-foreground">{formData.experience}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p className="text-2xl font-bold text-foreground">{formData.subjects.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success-light flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="text-sm font-bold text-foreground">{formData.dateOfJoining.split(',')[0]}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-info-light flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="text-sm font-bold text-foreground">Science</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Professional Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-slide-up" style={{ animationDelay: "250ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                          id="designation"
                          value={formData.designation}
                          onChange={(e) => setFormData({...formData, designation: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Department</p>
                        <p className="font-medium text-foreground">{formData.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Employee ID</p>
                        <p className="font-medium text-foreground">{formData.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date of Joining</p>
                        <p className="font-medium text-foreground">{formData.dateOfJoining}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Experience</p>
                        <p className="font-medium text-foreground">{formData.experience}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Qualification</p>
                        <p className="font-medium text-foreground">{formData.qualification}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Bio</p>
                      <p className="text-foreground">{formData.bio}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Subjects & Achievements */}
          <div className="space-y-6">
            <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Subjects Teaching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium text-foreground">{subject}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: "350ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-success-light flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Award className="w-3 h-3 text-success" />
                      </div>
                      <p className="text-sm text-foreground">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}
