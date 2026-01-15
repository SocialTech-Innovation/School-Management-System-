"use client"

import { useState, useEffect } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Calendar, User, BookOpen, Award, Home } from "lucide-react"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

const studentInfo = {
  name: 'Alex Johnson',
  studentId: 'STU-2024-0024',
  dateOfBirth: 'March 15, 2010',
  gender: 'Male',
  bloodGroup: 'O+',
  address: '123 Maple Street, Springfield, IL 62701',
  phone: '+1 (555) 123-4567',
  email: 'alex.johnson@student.edu',
  admissionDate: 'August 15, 2020',
  avatar: '',
}

const academicInfo = {
  class: '10-A',
  rollNo: 24,
  section: 'A',
  academicYear: '2025-2026',
  house: 'Blue House',
  stream: 'Science',
  medium: 'English',
}

const teacherContact = {
  name: 'Mrs. Anderson',
  role: 'Class Teacher',
  subject: 'English Literature',
  email: 'anderson@school.edu',
  phone: '+1 (555) 987-6543',
  avatar: '',
}

const emergencyContacts = [
  { name: 'Sarah Johnson', relation: 'Mother', phone: '+1 (555) 111-2222', email: 'sarah.j@email.com' },
  { name: 'Michael Johnson', relation: 'Father', phone: '+1 (555) 333-4444', email: 'michael.j@email.com' },
]

export default function ChildProfilePage() {
  const [selectedChild, setSelectedChild] = useState(childrenData[0])

  return (
    <ParentLayout title="Child's Profile" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Profile Header Card */}
        <Card className="animate-slide-up">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={studentInfo.avatar} alt={studentInfo.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {studentInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{studentInfo.name}</h2>
                <p className="text-muted-foreground">Student ID: {studentInfo.studentId}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-success text-white">Active Student</Badge>
                  <span className="text-sm text-muted-foreground">Class {academicInfo.class}</span>
                  <span className="text-sm text-muted-foreground">Roll No: {academicInfo.rollNo}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} className="text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-foreground">{studentInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium text-foreground">{studentInfo.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium text-foreground">{studentInfo.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-medium text-foreground">{studentInfo.bloodGroup}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-muted-foreground" />
                  <span className="text-foreground">{studentInfo.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-muted-foreground" />
                  <span className="text-foreground">{studentInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-muted-foreground" />
                  <span className="text-foreground">{studentInfo.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Details */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} className="text-primary" />
                Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Class</p>
                <p className="font-semibold text-foreground">{academicInfo.class}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Roll Number</p>
                <p className="font-semibold text-foreground">{academicInfo.rollNo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Academic Year</p>
                <p className="font-semibold text-foreground">{academicInfo.academicYear}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">House</p>
                <p className="font-semibold text-foreground">{academicInfo.house}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stream</p>
                <p className="font-semibold text-foreground">{academicInfo.stream}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Medium</p>
                <p className="font-semibold text-foreground">{academicInfo.medium}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admission Date</p>
                <p className="font-semibold text-foreground">{studentInfo.admissionDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Class Teacher Contact */}
        <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              Class Teacher
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={teacherContact.avatar} alt={teacherContact.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {teacherContact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-lg">{teacherContact.name}</p>
                <p className="text-sm text-muted-foreground">{teacherContact.role} • {teacherContact.subject}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{teacherContact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{teacherContact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home size={20} className="text-primary" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.relation}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Mail size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{contact.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  )
}
