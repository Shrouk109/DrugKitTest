/*eslint-disable*/
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/about-new";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Contact from "./Components/Contact/Contact";
import DownloadApp from "./Components/DownloadApp/DownloadApp";
import NotFound from "./Components/NotFound/NotFound";
import ConfirmEmail from "./Components/ConfirmEmail/ConfirmEmail";
import UserContextProvider from "./Context/userContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import CheckResetCode from "./Components/CheckResetCode/CheckResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import AllDrugs from "./Components/AllDrugs/AllDrugs";
import DrugDetails from "./Components/DrugDetails/DrugDetails";
import Alternatives from "./Components/Alternatives/Alternatives";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "drugdetails/:encodedDrugName",
        element: (
          <ProtectedRoute>
            <DrugDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "drugcategory/:id",
        element: (
          <ProtectedRoute>
            <AllDrugs />
          </ProtectedRoute>
        ),
      },
      {
        path: "alternatives/:drugName",
        element: (
          <ProtectedRoute>
            <Alternatives />
          </ProtectedRoute>
        ),
      },
      { path: "confirm-email", element: <ConfirmEmail /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "check-reset-code", element: <CheckResetCode /> },
      { path: "resetpassword", element: <ResetPassword /> },
      {
        path: "downloadApp",
        element: (
          <ProtectedRoute>
            <DownloadApp />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
