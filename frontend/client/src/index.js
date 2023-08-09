import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";
import RequireAuth from "./components/auth/RequireAuth";
import { AuthProvider } from "./context/auth/AuthProvider";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";
import Showroom from "./pages/Showroom";
import TestError from "./pages/TestError";
import AboutMe from "./pages/AboutMe";
import Login from "./pages/auth/Login";
//import Register from "./pages/auth/Register";
import AdminLayout from "./pages/admin/AdminLayout";
import Projects from "./pages/admin/projects/Projects";
import CreateProject from "./pages/admin/projects/CreateProject";
import UpdateProject from "./pages/admin/projects/UpdateProject";
import ProjectFiles from "./pages/admin/projects/ProjectFiles";
import AddProjectFile from "./pages/admin/projects/AddProjectFile";
import UpdateProjectFile from "./pages/admin/projects/UpdateProjectFile";
import Account from "./pages/admin/account/Account";
import Landscape from "./pages/Landscape";
import ContactMe from "./pages/ContactMe";

const router = createBrowserRouter([
  /* public */
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AboutMe />
      },
      {
        path: "/showroom",
        element: <Showroom />
      },
      { path: "/contacts", element: <ContactMe /> },
      {
        path: "/login",
        element: <Login />
      },
      /*{
        path: "/register",
        element: <Register />
      },*/
      {
        path: "/*",
        element: <NotFound />
      }
    ]
  },
  /* admin */
  {
    path: "/admin",
    element: <RequireAuth allowedRoles={["Admin"]} />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "projects",
            element: <Projects />
          },
          {
            path: "projects/create",
            element: <CreateProject />
          },
          {
            path: "projects/update/",
            element: <UpdateProject />
          },
          {
            path: "projects/files/",
            element: <ProjectFiles />
          },
          {
            path: "projects/files/add/",
            element: <AddProjectFile />
          },
          {
            path: "projects/files/update/",
            element: <UpdateProjectFile />
          },
          {
            path: "account",
            element: <Account />
          },
          {
            path: "test-error",
            element: <TestError />
          }
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
    <Landscape />
  </AuthProvider>
);
