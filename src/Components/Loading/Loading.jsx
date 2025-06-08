/*eslint-disable*/
import React, { useEffect, useState } from "react";
import style from "./Loading.module.css";
import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <>
    <div className="flex items-center justify-center w-full">
    <HashLoader color="#0c1469" />
    </div>
      
    </>
  );
}
