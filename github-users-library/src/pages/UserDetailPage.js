import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useLoaderData, defer, Await } from "react-router-dom";
import { Grid } from "@mui/material";
import classes from "./UserDetailPage.module.css";
import Spinner from "../components/Spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserDetailPage = () => {
  const { user } = useLoaderData();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.box}>
          <React.Suspense fallback={<Spinner />}>
            <Await resolve={user}>
              {(userInfo) => (
                <>
                  <Grid container>
                    <Grid item xs={8}>
                      <Grid>
                        <p>Name: {userInfo.name}</p>
                      </Grid>
                      <Grid>
                        <p>
                          Username:{" "}
                          <a href={userInfo.html_url} target="_blank">
                            {userInfo.login}
                          </a>
                        </p>
                      </Grid>
                      <Grid>
                        <Grid>
                          <p>Location: {userInfo.location}</p>
                          <p>
                            Available for hire:{" "}
                            {userInfo.hireable ? "Yes" : "No"}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid>
                        <p>
                          Followers:{" "}
                          <a href={userInfo.followers_url} target="_blank">
                            {userInfo.followers}
                          </a>
                        </p>
                      </Grid>
                      <Grid>
                        <p>
                          Following:{" "}
                          <a href={userInfo.following_url} target="_blank">
                            {userInfo.following}
                          </a>
                        </p>
                      </Grid>
                      <Grid>
                        <p>
                          Blog:{" "}
                          <a href={userInfo.blog || ""} target="_blank">
                            {userInfo.blog || "NA"}
                          </a>
                        </p>
                      </Grid>
                      <Grid>
                        <p>
                          Repos:{" "}
                          <a href={userInfo.repos_url} target="_blank">
                            {userInfo.repoInfo.length}
                          </a>
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid>
                        <img
                          src={userInfo.avatar_url}
                          height={"151px"}
                          width={"151px"}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.tableContainer}>
                    {userInfo.repoInfo.length && (
                      <Grid>
                        <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Repo Name</TableCell>
                                <TableCell align="left">Forks</TableCell>
                                <TableCell align="left">Watchers</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {userInfo.repoInfo.slice(0, 10).map((row) => (
                                <TableRow
                                  key={row.full_name}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0
                                    }
                                  }}
                                >
                                  <TableCell align="left">
                                    <a href={row.html_url} target="_blank">
                                      {row.full_name}
                                    </a>
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.forks}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.watchers}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
            </Await>
          </React.Suspense>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default UserDetailPage;

export const ErrorFetchingUser = () => {
  return <p>Could not fetch user from github, please try again !!!</p>;
};

const loadUser = async (id) => {
  try {
    const response = await fetch(`https://api.github.com/users/${id}`, {
      headers: {
        ...(process.env.REACT_APP_GITHUB_TOKEN
          ? {
              Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
          : null),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    const resData = await response.json();

    // get the repos here
    const repoResponse = await fetch(
      `https://api.github.com/users/${id}/repos?per_page=200`,
      {
        headers: {
          ...(process.env.REACT_APP_GITHUB_TOKEN
            ? {
                Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
              }
            : null),
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    );

    const repoData = await repoResponse.json();
    if (resData) {
      if (repoData.length) {
        resData.repoInfo = repoData;
      } else {
        resData.repoInfo = [];
      }
    }
    console.log("resData: ", resData);
    return resData;
  } catch (error) {
    console.log(error);
    throw new Response(
      JSON.stringify({ message: "Could not fetch user from github" }),
      { status: 500 }
    );
  }
};

export function loader({ params }) {
  return defer({
    user: loadUser(params.id)
  });
}
