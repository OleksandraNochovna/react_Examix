import { Alert, Snackbar, SnackbarProps } from '@mui/material';

interface Props extends SnackbarProps {
  errorMessage?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
}

const ErrorSnackBar: React.FC<Props> = ({
  errorMessage,
  description,
  onClose,
  open,
  sx,
  ...props
}) => {
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar
      sx={{ width: 400, ...sx }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={handleClose}
      open={open}
      {...props}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity="error"
        sx={{ width: '100%', height: '100%', backgroundColor: '#F55555' }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackBar;
