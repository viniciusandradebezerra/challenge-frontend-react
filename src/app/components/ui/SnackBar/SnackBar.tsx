'use client'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useToastMessage } from '@store';
import { SyntheticEvent, forwardRef, useEffect, useState } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackBar = () => {
  const [open, setOpen] = useState(false);
  const {message} = useToastMessage();

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(()=> {
    if(message.title.length > 0) {
        setOpen(true)
    }
  }, [message])

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert  onClose={handleClose} sx={{ width: '100%' }} severity={message.type}>{message.title}</Alert>
      </Snackbar>
    </Stack>
  );
}