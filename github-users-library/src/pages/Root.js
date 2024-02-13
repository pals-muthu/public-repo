import { Outlet, useNavigate } from "react-router-dom"
import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import { AppBar } from "@mui/material"

const Root = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(`/users`)
  }

  return (
    <>
      {/* TODO - add header navigation here and container here and make the header sticky */}
      <AppBar position="sticky">
        <div>
          <img
            src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            height={"40px"}
            width={"40px"}
            onClick={onClickHandler}
          />
          <p>Github Users Library</p>
        </div>
      </AppBar>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </React.Fragment>
    </>
  )
}

export default Root
