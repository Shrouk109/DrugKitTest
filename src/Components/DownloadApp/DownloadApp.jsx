/*eslint-disable*/
import React from "react";
import MobileDesign from "../../assets/mobile/mobile.png";
import download from "../../assets/download/images.jpeg";
import appStore from "../../assets/download/App_Store_(iOS,_2024).svg.png";

export default function DownloadApp() {
  return (
    <>
      <h1 className="text-4xl sm:text-3xl pt-8 pb-4 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[40%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[60%] bg-clip-text text-transparent">
        Download App
      </h1>

      <p className="text-center font-bold text-md sm:text-sm mb-14 px-4 leading-relaxed text-[var(--primary-color)]">
        Download DrugKit Now & Simplify Your Medication Search!
      </p>

      {/* content Download */}
      <section className="bg-[var(--secondary-color)] py-20">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="section-title">Download App</h2>
            <p className="section-subtitle">
              Download DrugKit today and take control <br />
              of your health!
            </p>
          </div>

          {/* content */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
            {/* mobile images */}
            <div className="flex gap-4 justify-center">
              <img src={MobileDesign} className="w-full" alt="mobile" />
            </div>

            {/* download buttons */}
            <div className="flex flex-col gap-3 sm:gap-5 mx-auto items-center justify-center w-full max-w-sm">
              <button className="flex items-center gap-3 sm:gap-4 cursor-pointer justify-center bg-white border px-3 py-2 sm:px-6 sm:py-4 rounded-lg shadow-md hover:shadow-lg transition w-full">
                <img src={download} className="w-10 sm:w-14" alt="google play" />
                <span className="text-gray-700 text-xs sm:text-lg font-semibold">
                  Get it on <br />
                  <span className="text-black text-sm sm:text-xl">Google Play</span>
                </span>
              </button>

              <button className="flex items-center gap-3 sm:gap-4 cursor-pointer justify-center bg-white border px-3 py-2 sm:px-6 sm:py-4 rounded-lg shadow-md hover:shadow-lg transition w-full">
                <img src={appStore} className="w-10 sm:w-12" alt="appstore" />
                <span className="text-gray-700 text-xs sm:text-lg font-semibold">
                  Download on the <br />
                  <span className="text-black text-sm sm:text-xl">App Store</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
