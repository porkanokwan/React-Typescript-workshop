import { Alert, Stack } from "@mui/material";
import { Snackbar } from "@mui/material";

function AlertError({
  errorMessage,
  handleClose,
  open,
}: {
  errorMessage: string;
  handleClose: () => void;
  open: boolean;
}) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default AlertError;
