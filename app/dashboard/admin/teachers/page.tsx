import { Suspense } from "react"
import TeacherPageContent from "./content"

export default function TeacherPage() {
  return (
    <Suspense fallback={null}>
      <TeacherPageContent />
    </Suspense>
  )
}
