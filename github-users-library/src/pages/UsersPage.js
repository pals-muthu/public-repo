import { useLoaderData, defer, Await } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import classes from "./UsersPage.module.css";
import Spinner from "../components/Spinner";
import UsersList from "../components/UsersList";

const UsersPage = () => {
  // data is automatically extracted from the response object.
  const { users } = useLoaderData();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <React.Suspense fallback={<Spinner />}>
          <Await resolve={users}>
            {(usersInfo) => <UsersList usersInfo={usersInfo} />}
          </Await>
        </React.Suspense>
      </Container>
    </React.Fragment>
  );
};

export default UsersPage;

export const ErrorFetchingUsers = () => {
  return <p>Could not fetch users from github, please try again !!!</p>;
};

const loadUsers = async () => {
  try {
    const response = await fetch("https://api.github.com/users?per_page=10", {
      headers: {
        ...(process.env.REACT_APP_GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` }
          : null),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    const resData = await response.json();
    const requestArrays = [];
    for (const eachUser of resData) {
      requestArrays.push(
        fetch(`https://api.github.com/users/${eachUser.login}`, {
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
      );
    }
    let detailedResponses = await Promise.all(requestArrays);
    detailedResponses = detailedResponses.map((eachResponse) =>
      eachResponse.json()
    );
    detailedResponses = await Promise.all(detailedResponses);
    // console.log("detailedResponses: ", detailedResponses);
    return detailedResponses;
  } catch (error) {
    console.log(error);
    throw new Response(
      JSON.stringify({ message: "Could not fetch users from github" }),
      { status: 500 }
    );
  }
};

export function loader() {
  return defer({
    users: loadUsers()
  });
}
