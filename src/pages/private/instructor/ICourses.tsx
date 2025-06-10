import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import CourseForm from '../../../components/ui/Form/CourseForm';
import {
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from '../../../services/coursesApi';
import { useAppSelector } from '../../../store/hooks';
import CoursesTable from '../CourseTable';
import { useNotification } from '../../../context/NotificationProvider';
import { transformCourses } from '../../../utils/index';

const TeacherCoursesPage = () => {
  const [open, setOpen] = useState(false);
  const { email: teacherId } = useAppSelector((s) => s.auth.user);
  const { data: rawCourses = [], refetch } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const { showNotification } = useNotification();

  const courses = transformCourses(rawCourses);
  const myCourses = courses.filter((c) => c.instructorEmail === teacherId);

  const enrichedCourses = (myCourses || []).map((course) => ({
    ...course,
    enrolledCount: course.enrolledCount ?? 0,
    assignmentCount: course.assignmentCount ?? 0,
    quizCount: course.quizCount ?? 0,
  }));

  const handleDelete = (row: any) => {
    const id = typeof row === 'number' ? row : row.id;
    deleteCourse(id)
      .unwrap()
      .then(() => {
        refetch();
        showNotification('Course deleted successfully', 'success');
      })
      .catch((err) => {
        console.error('Failed to delete course', err);
        showNotification('Failed to delete course', 'error');
      });
  };

  const handleEdit = (row: any) => {
    updateCourse({ id: row.id, data: row })
      .unwrap()
      .then(() => {
        refetch();
        showNotification('Course updated successfully', 'success');
      })
      .catch((err) => {
        console.error('Failed to update course', err);
        showNotification('Failed to update course', 'error');
      });
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">My Courses</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Course
        </Button>
      </Box>
      <CoursesTable
        rows={enrichedCourses}
        onEdit={(row) => handleEdit(row)}
        onDelete={(row) => handleDelete(row)}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          <CourseForm
            onSuccess={() => {
              refetch();
              setOpen(false);
            }}
            isOrgAdmin={false}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TeacherCoursesPage;
