import { createBrowserRouter } from "react-router-dom";
import MainlayOut from "../layout/MainlayOut";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import SignIn from "../pages/signin/SignIn";
import PrivateRoute from "./PrivateRoute";
import JobDetails from "../pages/JobDetails/JobDetails";
import JobApply from "./../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/ViewApplications/ViewApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainlayOut></MainlayOut>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/jobs/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply></JobApply>
          </PrivateRoute>
        ),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "addJob",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "myPostedJobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs></MyPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "viewApplications/:job_id",
        element: (
          <PrivateRoute>
            <ViewApplications></ViewApplications>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/job-applications/jobs/${params.job_id}`),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
