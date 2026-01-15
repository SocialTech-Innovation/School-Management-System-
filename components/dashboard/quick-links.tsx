import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, Clock, BookOpen, CreditCard, Megaphone, User } from "lucide-react"

const quickLinks = [
  { icon: Clock, label: "My Attendance", href: "/dashboard/student/attendance", color: "text-blue-600" },
  { icon: BookOpen, label: "My Grades", href: "/dashboard/student/grades", color: "text-purple-600" },
  { icon: CreditCard, label: "Fee Status", href: "/dashboard/student/fees", color: "text-green-600" },
  { icon: Calendar, label: "Timetable", href: "/dashboard/student/timetable", color: "text-orange-600" },
  { icon: Megaphone, label: "Announcements", href: "/dashboard/student/announcements", color: "text-pink-600" },
  { icon: User, label: "My Profile", href: "/dashboard/student/profile", color: "text-gray-600" },
]

export function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <Link
                key={index}
                href={link.href}
                className="quick-link-card"
              >
                <Icon className={`w-6 h-6 ${link.color}`} />
                <span className="text-sm font-medium text-foreground">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
