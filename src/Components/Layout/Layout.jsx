/*eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ConfirmEmail from "../ConfirmEmail/ConfirmEmail";
import { userContext } from "../../Context/userContext";
import AllDrugs from "../AllDrugs/AllDrugs";
import DrugDetails from "../DrugDetails/DrugDetails";
import ChatBot from "../ChatBot/ChatBot";

export default function Layout() {
  let { setUserData } = useContext(userContext);
  let navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = [
    "/register",
    "/login",
    "/confirm-email",
    "/forgot-password",
    "/check-reset-code",
    "/resetpassword",
  ].includes(location.pathname);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserData(localStorage.getItem("userToken"));
    }
    // else {
    //   navigate("/login");
    // }
  }, []);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Outlet></Outlet>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <ChatBot />}
    </>
  );
}
