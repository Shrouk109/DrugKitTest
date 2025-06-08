/*eslint-disable*/
import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
import logo from "../../assets/Logo/logo.png";
import qrCode from "../../assets/Qr-code/qr-code.png";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

export default function Footer() {
  return (
    <div className="bg-[var(--primary-color)] pt-16 text-white text-center">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {/* Logo + description + icons */}
          <div>
            <img src={logo} width={180} alt="logo" className="mb-4" />
            <p className="leading-relaxed text-sm">
              DrugKit helps you find the right medications and nearby pharmacies
              easily. Our goal is to make healthcare more accessible with
              accurate drug information and location-based pharmacy search.
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
          <div className="text-center">
            <h3 className="font-bold text-xl mb-4">DrugKit</h3>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:underline">About</li>
              <li className="cursor-pointer hover:underline">Features</li>
              <li className="cursor-pointer hover:underline">Contact Us</li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center">
            <h3 className="font-bold text-xl mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:underline">Medication Information</li>
              <li className="cursor-pointer hover:underline">Pharmacy Locator</li>
              <li className="cursor-pointer hover:underline">Health Tips</li>
            </ul>
          </div>

          {/* QR Download */}
          <div className="text-center">
            <h3 className="font-bold text-xl mb-4">Download App</h3>
            <img src={qrCode} className="mx-auto " width={150} alt="qrCode" />
            <p className="mt-4 text-sm">
              Scan the QR code to download <br /> <span className="font-semibold">DrugKit</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 py-6 text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} <span className="font-bold">DrugKit</span>. All rights reserved.
      </div>
    </div>
  );
}
