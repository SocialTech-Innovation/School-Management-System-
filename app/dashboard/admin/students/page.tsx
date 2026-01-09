import { Suspense } from "react"
import StudentPageContent from "./content"

export default function StudentPage() {
  return (
    <Suspense fallback={null}>
      <StudentPageContent />
    </Suspense>
  )
}
