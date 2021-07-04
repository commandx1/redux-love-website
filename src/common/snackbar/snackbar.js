import { Snackbar, Slide } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const AppSnackbar = ({
  open,
  onClose,
  autoHideDuration = 5000,
  type = 'error',
  text,
}) => {
  return (
    <Snackbar
      TransitionComponent={Slide}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
    >
      <Alert onClose={onClose} severity={type}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
