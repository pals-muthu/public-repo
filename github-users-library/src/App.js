import "./App.css"
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UsersPage, {
  loader as UsersLoader,
  ErrorFetchingUsers
} from "./pages/UsersPage"
import Root from "./pages/Root"
import UserDetailPage, {
  loader as UserDetailLoader
} from "./pages/UserDetailPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/users",
        loader: UsersLoader,
        element: <UsersPage />,
        errorElement: <ErrorFetchingUsers />
      },
      {
        // TODO - use data from the users page, get the id alone from query parages
        path: "/users/:id",
        loader: UserDetailLoader,
        element: <UserDetailPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
