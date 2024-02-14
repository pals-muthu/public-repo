import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { useLoaderData, defer, Await } from "react-router-dom"
import { CircularProgress, Grid } from "@mui/material"
import classes from "./UserDetailPage.module.css"

const UserDetailPage = () => {
  const { user } = useLoaderData()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <Box
          // sx={{ bgcolor: "#cfe8fc", height: "80vh" }}
          className={classes.box}
        >
          <React.Suspense fallback={<CircularProgress color="inherit" />}>
            <Await resolve={user}>
              {(userInfo) => (
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
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
                        </Grid>
                        <p>Open to hire: {userInfo.hireable ? "Yes" : "No"}</p>
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
                    <Grid item xs={12}>
                      <Grid>
                        Followers:{" "}
                        <a href={userInfo.followers_url} target="_blank">
                          {userInfo.followers}
                        </a>
                      </Grid>
                      <Grid>
                        Repos:{" "}
                        <a href={userInfo.repos_url} target="_blank">
                          {userInfo.repos_url}
                        </a>
                      </Grid>
                      <Grid>
                        Blog:{" "}
                        <a href={userInfo.blog} target="_blank">
                          {userInfo.blog}
                        </a>
                      </Grid>
                      <Grid></Grid>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Await>
          </React.Suspense>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default UserDetailPage

export const ErrorFetchingUser = () => {
  return <p>Could not fetch user from github, please try again !!!</p>
}

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
    })

    const resData = await response.json()
    console.log("resData: ", resData)
    return resData
  } catch (error) {
    console.log(error)
    throw new Response(
      JSON.stringify({ message: "Could not fetch user from github" }),
      { status: 500 }
    )
  }
}

export function loader({ params }) {
  return defer({
    user: loadUser(params.id)
  })
}
