"use client"

import { Card } from "@/components/ui/card"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, GraduationCap, Users, Mail, Phone, MapPin, Calendar, BookOpen } from "lucide-react"

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

export default function StudentProfile() {
  return (
    <StudentLayout title="My Profile" showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Profile Header */}
        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-32 h-32 border-4 border-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">AJ</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground">Alex Johnson</h2>
              <p className="text-muted-foreground">Student ID: STU-2024-001</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <span className="status-badge status-info">Class 10-A</span>
                <span className="status-badge status-success">Active</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h3 className="section-title">Personal Information</h3>
            </div>
            <div className="space-y-4">
              <InfoRow label="Full Name" value="Alexander Michael Johnson" />
              <InfoRow label="Date of Birth" value="January 15, 2009" />
              <InfoRow label="Gender" value="Male" />
              <InfoRow label="Blood Group" value="O+" />
              <InfoRow label="Nationality" value="American" />
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="section-title">Contact Information</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">alex.johnson@school.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Oak Street, Springfield, IL 62701
                </span>
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h3 className="section-title">Academic Information</h3>
            </div>
            <div className="space-y-4">
              <InfoRow label="Roll Number" value="12" />
              <InfoRow label="Class" value="10-A" />
              <InfoRow label="Section" value="A" />
              <InfoRow label="Academic Year" value="2025-2026" />
              <InfoRow label="Enrollment Date" value="April 1, 2023" />
              <InfoRow label="House" value="Blue Eagles" />
            </div>
          </Card>

          {/* Parent/Guardian Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="section-title">Parent/Guardian Information</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Father</p>
                <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                  <p className="text-sm text-foreground">Michael Johnson</p>
                  <p className="text-xs text-muted-foreground">+1 (555) 987-6543</p>
                  <p className="text-xs text-muted-foreground">michael.j@email.com</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Mother</p>
                <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                  <p className="text-sm text-foreground">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">+1 (555) 987-6544</p>
                  <p className="text-xs text-muted-foreground">sarah.j@email.com</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </StudentLayout>
  )
}
