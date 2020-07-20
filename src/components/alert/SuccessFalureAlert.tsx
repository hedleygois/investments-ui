import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export type SuccessFailureAlertProps = {
  successMessage: string;
  failureMessage?: string;
  success?: boolean;
};

export const SuccessFailureAlert = ({
  successMessage,
  failureMessage,
  success,
}: SuccessFailureAlertProps) => (
  <>
    <Snackbar autoHideDuration={3000} open={success}>
      <MuiAlert severity="success">{successMessage}</MuiAlert>
    </Snackbar>
    <Snackbar autoHideDuration={3000} open={success === false}>
      <MuiAlert severity="error" variant="filled">
        {failureMessage ? failureMessage : "There was an error. Try again."}
      </MuiAlert>
    </Snackbar>
  </>
);
