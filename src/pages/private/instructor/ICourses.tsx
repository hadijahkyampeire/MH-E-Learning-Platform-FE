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
import CoursesTable from '../../../components/courses/Table';
import { useNotification } from '../../../context/NotificationProvider';
import { type CourseRow } from '../../../types/courses';
import { semesterNumberToText } from '../../../utils';

const TeacherCoursesPage = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] =
    useState<Partial<CourseRow> | null>(null);
  const [duplicateMode, setDuplicateMode] = useState(false);

  const { data: rawCourses = [], refetch } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();
  const { showNotification } = useNotification();
  const [updateCourse] = useUpdateCourseMutation();

  const handleComplete = (course: CourseRow) => {
    updateCourse({ id: course.id, data: { is_completed: true } })
      .unwrap()
      .then(() => {
        refetch();
        showNotification('Course marked complete', 'success');
      })
      .catch(() => {
        showNotification('Failed to complete course', 'error');
      });
  };

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

  const openEditForm = (row: CourseRow) => {
    const prefilled = {
      ...row,
      semester: semesterNumberToText[row.semester as unknown as keyof typeof semesterNumberToText],
    };
    setSelectedCourse(prefilled);
    setEditMode(true);
    setOpen(true);
  };

  const openDuplicateForm = (row: CourseRow) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, is_completed, created_at, updated_at, ...rest } = row;
    setSelectedCourse({
      ...rest,
      month: row.month < 12 ? row.month + 1 : 1,
      year: row.month < 12 ? row.year : row.year + 1,
    });
    setEditMode(false);
    setDuplicateMode(true);
    setOpen(true);
  };

  const handleFormSuccess = () => {
    refetch();
    setOpen(false);
    setSelectedCourse(null);
    setEditMode(false);
    setDuplicateMode(false);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">My Courses</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            setSelectedCourse(null);
            setEditMode(false);
            setDuplicateMode(false);
          }}
        >
          Add Course
        </Button>
      </Box>
      <CoursesTable
        rows={rawCourses}
        onEdit={openEditForm}
        onDelete={handleDelete}
        onComplete={handleComplete}
        onDuplicate={openDuplicateForm}
      />

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedCourse(null);
          setEditMode(false);
          setDuplicateMode(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle color="primary">
          {selectedCourse
            ? `Edit ${selectedCourse.name}`
            : duplicateMode
            ? 'Duplicate Course'
            : 'Add Course'}
        </DialogTitle>
        <DialogContent>
          <CourseForm
            course={selectedCourse || {}}
            onSuccess={handleFormSuccess}
            isOrgAdmin={false}
            isDuplicate={duplicateMode}
            isEditMode={editMode}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TeacherCoursesPage;
