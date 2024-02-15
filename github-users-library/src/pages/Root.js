import { Outlet, useNavigate } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { AppBar, Button, Grid, TextField } from "@mui/material";
import classes from "./Root.module.css";
import { useDispatch } from "react-redux";
import { searchActions } from "../store/FilterStore";

const Root = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userChangeHandler = (e) => {
    dispatch(searchActions.updateUser({ value: e.target.value }));
  };
  const locationChangeHandler = (e) => {
    dispatch(searchActions.updateLocation({ value: e.target.value }));
  };

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
              <Grid item xs="auto">
                <TextField
                  id="outlined-basic"
                  label="User"
                  variant="outlined"
                  onChange={userChangeHandler}
                />
                <TextField
                  id="outlined-basic"
                  label="Location"
                  variant="outlined"
                  onChange={locationChangeHandler}
                />
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
