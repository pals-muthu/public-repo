import React from "react";
import classes from "./Spinner.module.css";
import { Grid, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <CircularProgress color="inherit" />
    </Grid>
  );
};

export default Spinner;
