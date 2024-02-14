import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import classes from "./UserCard.module.css"

const UserCard = (props) => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(`/users/${props.userInfo.login}`)
  }

  return (
    <Card sx={{ display: "flex" }} className={classes.card}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.userInfo.avatar_url}
        alt={props.userInfo.avatar_url || "-"}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.userInfo.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.userInfo.login}
          </Typography>
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            onClick={onClickHandler}
            className={classes.infoBtn}
          >
            More Info
          </Button>
        </CardContent>
      </Box>
    </Card>
  )
}

export default UserCard
