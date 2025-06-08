/*eslint-disable*/
import React, { useEffect, useState } from "react";
import style from "./NotFound.module.css";
import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/NotFound/RrHQOlRelf.json";

export default function NotFound() {
  return (
    <div className="w-full max-w-[600px] mx-auto px-4 py-10">
      <Lottie
        animationData={notFoundAnimation}
        loop={true}
      />
    </div>
  );
}
