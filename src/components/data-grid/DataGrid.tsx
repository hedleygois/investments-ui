import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

export interface DataGridProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 120,
    width: 120,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export const DataGrid = ({ children }: DataGridProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};
