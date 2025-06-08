/* eslint-disable */
import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import bgNavbar from "../../assets/bg-navbar/bg-navbar.png";
import logo from "../../assets/Logo/logo.png";
import { userContext } from "../../Context/userContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setUserData, userData } = useContext(userContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <nav>
        <div
          className="container max-w-8xl bg-cover bg-center relative"
          // style={{ backgroundImage: `url(${bgNavbar})` }}
        >
          <div className="flex justify-between items-center py-4 px-4">
            {/* Logo */}
            <div className="logo">
              <img src={"/logo.png"} className="w-32" alt="logo" />
            </div>

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-x-16 text-gray-700 font-semibold">
              <li>
                <NavLink to="/" className="hover:text-gray-600">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className="hover:text-gray-600">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-gray-600">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/downloadApp" className="hover:text-gray-600">
                  Download App
                </NavLink>
              </li>
            </ul>

            {/* Desktop Logout Button */}
            <div>
              {userData ? (
                <div>
                  <button
                    onClick={() => logout()}
                    className="hidden md:block bg-[var(--secondary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-hover)] duration-500 cursor-pointer font-semibold px-8 py-2 rounded-lg"
                  >
                    LogOut
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <NavLink
                    to={"register"}
                    className="hidden md:block bg-[var(--secondary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-hover)] duration-500 cursor-pointer font-semibold px-8 py-2 rounded-lg"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to={"login"}
                    className="hidden ms-2 md:block bg-[var(--secondary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-hover)] duration-500 cursor-pointer font-semibold px-8 py-2 rounded-lg"
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <ul className="md:hidden absolute top-[100px] left-0 w-full bg-black/90 text-white text-center py-4 space-y-6">
              <li>
                <NavLink
                  to="/"
                  className="block hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/downloadApp"
                  className="block hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Download App
                </NavLink>
              </li>
              <li>
                <button
                  className="bg-[var(--secondary-color)] text-[var(--primary-color)] hover:bg-[var(--secondary-hover)] duration-500 font-semibold px-6 py-2 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  LogOut
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
