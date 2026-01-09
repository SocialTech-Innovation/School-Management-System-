import { Card, CardContent } from "@/components/ui/card"

export function AdminWelcomeBanner() {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
      <CardContent className="pt-8 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
            <p className="text-blue-100">You have 3 pending fee collections and 5 new student enrollments.</p>
          </div>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white"
          />
        </div>
      </CardContent>
    </Card>
  )
}
