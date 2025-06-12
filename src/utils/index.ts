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
  enrolledCount: number;
  assignmentCount: number;
  quizCount: number;
}


export const transformCourses = (coursesFromApi: any[]): CourseRow[] => {
  return coursesFromApi.map((course) => ({
    id: course.id,
    name: course.name,
    course_code: course.course_code,
    semester: course.semester === 1 ? 'First' : 'Second',
    month: course.month,
    year: course.year,
    is_completed: course.is_completed,
    instructorEmail: course.user?.email ?? 'N/A',
    organizationName: course.user?.organization_name ?? 'N/A',
    enrolledCount: Math.floor(Math.random() * 30),
    assignmentCount: Math.floor(Math.random() * 10),
    quizCount: Math.floor(Math.random() * 5),
  }));
};

// utils/semesterMap.ts
export const semesterNumberToText = {
  1: 'first',
  2: 'second',
  3: 'summer', // in case your backend uses 3
};

export const semesterTextToNumber = {
  first: 1,
  second: 2,
  summer: 3,
};
