import { supabase } from "../supabaseClient";

/**
 * Creates a new assessment entry.
 */
export async function createAssessment(assessment: any) {
  const { data, error } = await supabase
    .from("assessments")
    .insert(assessment);
  
  if (error) throw error;
  return data;
}

/**
 * Submits grades for a specific assessment in bulk.
 */
export async function submitGrades(grades: Array<{ assessmentId: string; studentId: string; marksObtained: number; totalMarks: number; grade: string }>) {
  const records = grades.map(g => ({
    assessment_id: g.assessmentId,
    student_id: g.studentId,
    marks_obtained: g.marksObtained,
    total_marks: g.totalMarks,
    grade: g.grade
  }));

  const { data, error } = await supabase
    .from("grades")
    .insert(records);

  if (error) throw error;
  return data;
}