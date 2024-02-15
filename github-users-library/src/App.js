import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage, {
  loader as UsersLoader,
  ErrorFetchingUsers
} from "./pages/UsersPage";
import Root from "./pages/Root";
import UserDetailPage, {
  ErrorFetchingUser,
  loader as UserDetailLoader
} from "./pages/UserDetailPage";
import { Provider } from "react-redux";
import store from "./store/FilterStore";

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
        element: <UserDetailPage />,
        errorElement: <ErrorFetchingUser />
      }
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
