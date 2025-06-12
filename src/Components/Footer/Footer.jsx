/*eslint-disable*/
import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
import logo from "../../assets/Logo/logo.png";
import qrCode from "../../assets/Qr-code/qr-code.png";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <div className="bg-gray-100 p-16 text-gray-700 w-full  text-center rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 justify-between items-start text-left">
            {/* Logo + description + icons */}
            <div className="flex-1">
              <img src={logo} width={180} alt="logo" className="mb-4" />
              <p className="leading-relaxed text-sm">
                DrugKit helps you find the right medications and nearby
                pharmacies easily. Our goal is to make healthcare more
                accessible with accurate drug information and location-based
                pharmacy search.
              </p>
              <div className="flex gap-4 mt-6 text-lg justify-start">
                <div className="icon-style">
                  <FaFacebookF />
                </div>
                <div className="icon-style">
                  <FaGoogle />
                </div>
                <div className="icon-style">
                  <FaLinkedinIn />
                </div>
                <div className="icon-style">
                  <GrInstagram />
                </div>
              </div>
            </div>

            {/* DrugKit links */}
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-xl mb-4">DrugKit</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-2 flex-1">
              <h3 className="font-bold text-xl mb-4">Our Services</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link to="/" className="hover:underline">
                    Drug alternatives
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacy-locator" className="hover:underline">
                    Pharmacy Locator
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Health Tips
                  </Link>
                </li>
              </ul>
            </div>

            {/* QR Download */}
            <div className="text-center flex-1">
              <h3 className="font-bold text-xl mb-4">Download App</h3>
              <img src={qrCode} className="mx-auto " width={150} alt="qrCode" />
              <p className="mt-4 text-sm">
                Scan the QR code to download <br />{" "}
                <span className="font-semibold">DrugKit</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="  text-gray-400 text-sm text-center py-2">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold">DrugKit</span>. All rights reserved.
      </div>
    </div>
  );
}
