import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import EnrolledStudentsTable from './EnrolledStudentsTable';
import EnrollStudentsDrawer from './EnrollStudentsDrawer';
import ConfirmEnrollDialog from './ConfirmationDialog';
import { useGetOrgUsersQuery } from '../../../services/usersApi';
import {
  useAddEnrollmentMutation,
  useBulkCreateEnrollmentsMutation,
  useGetEnrollmentsQuery,
} from '../../../services/enrollmentApi';
import { useNotification } from '../../../context/NotificationProvider';
import { useGetCourseQuery } from '../../../services/coursesApi';

function Students() {
  const { id: courseId } = useParams<{ id: string }>();
  const { data: course } = useGetCourseQuery(courseId!);
  const { data: users = [] } = useGetOrgUsersQuery();
  const { data: enrollments = [] } = useGetEnrollmentsQuery(courseId!);
  const [addEnrollment] = useAddEnrollmentMutation();
  const [bulkCreateEnrollments] = useBulkCreateEnrollmentsMutation();
  const { showNotification } = useNotification();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const enrolledUsers = useMemo(() => {
    return enrollments.map((e) => {
      const u = users.find((u) => u.email === e.email)!;
      return {
        ...u,
        status: e.status,
      };
    });
  }, [enrollments, users]);

  const notEnrolledUsers = useMemo(() => {
    const enrolledIds = new Set(enrolledUsers.map((u) => u.id));
    return users.filter((u) => !enrolledIds.has(u.id));
  }, [users, enrolledUsers]);

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

      <EnrolledStudentsTable rows={enrolledUsers} />
      <EnrollStudentsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        users={notEnrolledUsers}
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
