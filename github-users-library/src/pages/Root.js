import { Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { AppBar, Button, Grid } from "@mui/material";
import classes from "./Root.module.css";

const Root = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/users`);
  };

  return (
    <>
      {/* TODO - add header navigation here and container here and make the header sticky */}
      <AppBar position="sticky">
        <Grid
          container
          direction="row"
          className={classes.rootGrid}
          spacing={3}
        >
          <Grid item xs="auto">
            <img
              src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
              onClick={onClickHandler}
              className={classes.logo}
            />
          </Grid>
          <Grid item className={classes.home} xs="auto">
            <Button
              variant="text"
              size="medium"
              onClick={onClickHandler}
              className={classes.button}
            >
              Home
            </Button>
          </Grid>
          <Grid item className={classes.headerContainer}>
            <Grid container direction="row" className={classes.mainText}>
              <Grid item xs="auto">
                <p>GitHub Users Library</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </React.Fragment>
    </>
  );
};

export default Root;
