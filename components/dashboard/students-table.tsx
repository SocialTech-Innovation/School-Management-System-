import { Badge } from "@/components/ui/badge"

export function StudentsTable() {
  const students = [
    { id: "S001", name: "John Doe", email: "john@school.edu", class: "10-A", status: "Active" },
    { id: "S002", name: "Jane Smith", email: "jane@school.edu", class: "10-B", status: "Active" },
    { id: "S003", name: "Mike Johnson", email: "mike@school.edu", class: "9-A", status: "Inactive" },
    { id: "S004", name: "Sarah Williams", email: "sarah@school.edu", class: "10-A", status: "Active" },
    { id: "S005", name: "Tom Brown", email: "tom@school.edu", class: "9-B", status: "Active" },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 font-semibold text-muted-foreground">Student ID</th>
            <th className="text-left p-3 font-semibold text-muted-foreground">Name</th>
            <th className="text-left p-3 font-semibold text-muted-foreground">Email</th>
            <th className="text-left p-3 font-semibold text-muted-foreground">Class</th>
            <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b border-border hover:bg-muted transition">
              <td className="p-3">{student.id}</td>
              <td className="p-3 font-semibold text-foreground">{student.name}</td>
              <td className="p-3 text-muted-foreground">{student.email}</td>
              <td className="p-3">{student.class}</td>
              <td className="p-3">
                <Badge
                  className={`${
                    student.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  } border-0`}
                >
                  {student.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
