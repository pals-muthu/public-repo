import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { useLoaderData, defer, Await } from "react-router-dom"
import { Grid } from "@mui/material"
import classes from "./UserDetailPage.module.css"
import Spinner from "../components/Spinner"

const UserDetailPage = () => {
  const { user } = useLoaderData()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.box}>
          <React.Suspense fallback={<Spinner />}>
            <Await resolve={user}>
              {(userInfo) => (
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
                        <p>Available for hire: {userInfo.hireable ? "Yes" : "No"}</p>
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
                        Repos:{" "}
                        <a href={userInfo.repos_url} target="_blank">
                          {userInfo.repoInfo.length}
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
                    <Grid></Grid>
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

    // get the repos here
    const repoResponse = await fetch(`https://api.github.com/users/${id}/repos?per_page=200`, {
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

    const repoData = await repoResponse.json()
    if (repoData.length) {
      resData.repoInfo = repoData
    } else {
      resData.repoInfo = []
    }
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
