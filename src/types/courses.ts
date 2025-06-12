export interface CourseRow {
  id: number;
  name: string;
  course_code: string;
  semester: string;
  month: number;
  year: number;
  is_completed: boolean;
  instructorEmail: string;
  organizationName: string;
  enrollment_count: number;
  assignment_type_counts: {
    homework?: number;
    quiz?: number;
    exam?: number;
    project?: number;
  };
  [key: string]: any;
}