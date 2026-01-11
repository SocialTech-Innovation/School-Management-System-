import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface WelcomeCardProps {
  name: string
  message: string
  avatarUrl?: string
  initials?: string
}

export function WelcomeCard({ name, message, avatarUrl, initials = "ST" }: WelcomeCardProps) {
  return (
    <div className="gradient-welcome rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {name}! 👋</h2>
        <p className="text-primary-foreground/90">
          {message}
        </p>
      </div>
      <div className="absolute right-8 bottom-0 flex items-end">
        <Avatar className="w-24 h-24 border-4 border-primary-foreground/30">
          <AvatarImage src={avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=student"} />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
        </Avatar>
      </div>
      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-foreground/10 rounded-full" />
      <div className="absolute right-20 -bottom-20 w-60 h-60 bg-primary-foreground/5 rounded-full" />
    </div>
  )
}
