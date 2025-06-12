/*eslint-disable*/
import React from "react";
import MobileDesign from "../../assets/mobile/mobile.png";
import download from "../../assets/download/images.jpeg";
import appStore from "../../assets/download/App_Store_(iOS,_2024).svg.png";

export default function DownloadApp() {
  return (
    <>
      

      {/* content Download */}
      <section className="bg-[var(--secondary-color)] py-16 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-2">
            <h2 className="section-title">Download App</h2>
            <p className="section-subtitle">
              Get DrugKit for smarter med <br/> management.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Mobile Image */}
            <div className="flex-1 flex justify-center mb-2 md:mb-0">
              <img
                src={MobileDesign}
                alt="DrugKit App"
                className="w-100 h-auto rounded-xl "
              />
            </div>
            {/* Download Buttons */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-gray-600 mb-6 max-w-md">
                Download the app for free and enjoy a fast, easy experience to
                search for medicines, discover alternatives, and connect with
                the nearest pharmacy anytime.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg shadow-sm hover:scale-105 transition text-lg font-medium"
                >
                  <img src={download} className="w-7 h-7" alt="google play" />
                  Google Play
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg shadow-sm hover:scale-105 transition text-lg font-medium"
                >
                  <img src={appStore} className="w-7 h-7" alt="appstore" />
                  App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
