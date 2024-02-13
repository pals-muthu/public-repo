import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { useLoaderData, defer, Await } from "react-router-dom"
import { CircularProgress } from "@mui/material"

const UserDetailPage = () => {
  const { user } = useLoaderData()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <React.Suspense fallback={<CircularProgress color="inherit" />}>
            <Await resolve={user}>
              {(userInfo) => <p>{userInfo.login}</p>}
            </Await>
          </React.Suspense>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default UserDetailPage

export const ErrorFetchingUsers = () => {
  return <p>Could not fetch users from github, please try again !!!</p>
}

const loadUsers = async (id) => {
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
  console.log("params: ", params)
  return defer({
    user: loadUsers(params.id)
  })
}
