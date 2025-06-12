import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import EnrolledStudentsTable from './EnrolledStudentsTable';
import EnrollStudentsDrawer from './EnrollStudentsDrawer';
import ConfirmEnrollDialog from './ConfirmationDialog';
import {
  useAddEnrollmentMutation,
  useBulkCreateEnrollmentsMutation,
} from '../../../services/enrollmentApi';
import { useNotification } from '../../../context/NotificationProvider';
import {
  useGetCourseQuery,
  useGetEnrolledStudentsQuery,
  useGetUnenrolledStudentsQuery,
} from '../../../services/coursesApi';

function Students() {
  const { id: courseId } = useParams<{ id: string }>();
  type Course = { name?: string; [key: string]: any };
  const { data: course = {} as Course, refetch } = useGetCourseQuery(courseId!);
  const { data: enrolledStudents = [] } = useGetEnrolledStudentsQuery(
    courseId!
  );
  const { data: unenrolledStudents = [] } = useGetUnenrolledStudentsQuery(
    courseId!
  );
  const [addEnrollment] = useAddEnrollmentMutation();
  const [bulkCreateEnrollments] = useBulkCreateEnrollmentsMutation();
  const { showNotification } = useNotification();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleConfirmEnroll = async () => {
    const payload = selectedIds.map((id) => ({
      user_id: id,
      course_id: courseId ? Number(courseId) : 0,
    }));
    try {
      if (payload.length === 1) {
        await addEnrollment({
          courseId: Number(courseId),
          data: payload[0],
        }).unwrap();
      } else {
        await bulkCreateEnrollments({
          courseId: Number(courseId),
          data: payload,
        }).unwrap();
      }
      showNotification('Enrollment successful', 'success');
      setConfirmOpen(false);
      setDrawerOpen(false);
      setSelectedIds([]);
      refetch();
    } catch {
      showNotification('Enrollment failed', 'error');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        {course?.name} – Enrolled Students
      </Typography>
      <Button
        variant="contained"
        onClick={() => setDrawerOpen(true)}
        sx={{ mb: 2 }}
      >
        Enroll Students
      </Button>

      <EnrolledStudentsTable rows={enrolledStudents} courseName={course?.name} />
      <EnrollStudentsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        users={unenrolledStudents}
        selectedIds={selectedIds}
        onSelectChange={setSelectedIds}
        onConfirm={() => setConfirmOpen(true)}
      />
      <ConfirmEnrollDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        count={selectedIds.length}
        courseName={course?.name}
        onConfirm={handleConfirmEnroll}
      />
    </Box>
  );
}

export default Students;
