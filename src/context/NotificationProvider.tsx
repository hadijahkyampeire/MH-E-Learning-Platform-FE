import { createContext, useContext, useState, type ReactNode } from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';

type NotificationContextType = {
  showNotification: (
    message: string,
    severity?: AlertColor,
    duration?: number
  ) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  return context;
};

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [autoHideDuration, setAutoHideDuration] = useState<number>(3000);

  const showNotification = (
    msg: string,
    sev: AlertColor = 'info',
    duration: number = 5000
  ) => {
    setMessage(msg);
    setSeverity(sev);
    setAutoHideDuration(duration);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
