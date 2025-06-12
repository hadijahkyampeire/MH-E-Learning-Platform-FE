import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

function ConfirmEnrollDialog({
  open,
  onClose,
  onConfirm,
  count,
  courseName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
  courseName?: string;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Enrollment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to enroll {count} student
          {count > 1 ? 's' : ''} in <strong>{courseName}</strong>. Continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Yes, Enroll
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmEnrollDialog;