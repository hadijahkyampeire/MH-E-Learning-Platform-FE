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
import CoursesTable from '../CourseTable';
import { useNotification } from '../../../context/NotificationProvider';

const OrgAdminCoursesPage = () => {
  const [open, setOpen] = useState(false);
  const { data: courses = [], refetch } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const { showNotification } = useNotification();

  const enrichedCourses = (courses || []).map((course) => ({
    ...course,
    enrolledCount: course.enrolledCount ?? 0,
    assignmentCount: course.assignmentCount ?? 0,
    quizCount: course.quizCount ?? 0,
  }));

  const handleDelete = (id: number) => {
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
        <Typography variant="h5">Courses in Organization</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Course
        </Button>
      </Box>

      <CoursesTable
        rows={enrichedCourses}
        onEdit={(row) => handleEdit(row)}
        onEnroll={(row) => {
          console.log(row.id);
        }}
        onDelete={(row) => handleDelete(row.id)}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          <CourseForm
            onSuccess={() => {
              refetch();
              setOpen(false);
            }}
            isOrgAdmin={true}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrgAdminCoursesPage;
