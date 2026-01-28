import { supabase } from "../supabaseClient";

/**
 * Marks attendance for a whole class in bulk as required by the guide.
 */
export async function markAttendance(attendanceData: {
  classId: string;
  teacherId: string;
  date: string;
  attendance: Array<{ studentId: string; status: 'present' | 'absent' | 'late' | 'excused'; notes?: string }>;
}) {
  const records = attendanceData.attendance.map((record) => ({
    class_id: attendanceData.classId,
    teacher_id: attendanceData.teacherId,
    student_id: record.studentId,
    date: attendanceData.date,
    status: record.status,
    notes: record.notes,
  }));

  const { data, error } = await supabase
    .from("attendance")
    .upsert(records);

  if (error) throw error;
  return data;
}