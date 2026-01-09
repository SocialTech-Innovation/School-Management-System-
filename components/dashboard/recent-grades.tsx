interface RecentGradesProps {
  subject: string
  grade: string
  date: string
}

export function RecentGrades({ subject, grade, date }: RecentGradesProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-border last:border-b-0 last:pb-0">
      <div>
        <p className="font-semibold text-foreground text-sm">{subject}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <div className="text-lg font-bold text-blue-600">{grade}</div>
    </div>
  )
}
