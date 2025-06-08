/* eslint-disable */
import React from "react";
import team from "../../assets/About/young-doctors-with-cardiogram-hospital 1 (1).png";

export default function About() {
  return (
    <>
      <h1 className="text-4xl sm:text-3xl pt-8 pb-4 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[40%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[60%] bg-clip-text text-transparent">
        About DrugKit
      </h1>

      <p className="text-center font-bold text-md sm:text-sm mb-14 px-4 leading-relaxed text-[var(--primary-color)]">
        We are transforming healthcare by making medications more accessible
        <br className="hidden sm:block" />
        with AI-powered solutions.
      </p>

      {/* Our Story & Vision */}
      <section className="bg-[var(--secondary-color)] py-20 mt-16">
        <div className="text-center mb-14">
          <h2 className="section-title">Our Story & Vision</h2>
        </div>

        {/* content */}
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* img */}
            <div className="flex justify-center">
              <img
                src={team}
                alt="Our Team"
                className="w-full sm:max-w-full lg:max-w-xl rounded-lg shadow-lg"
              />
            </div>

            {/* text*/}
            <div className="text-center lg:text-left font-medium text-md sm:text-md">
              <p className="italic text-[#444] leading-7">
                "We believe that access to medication should be simple, safe,
                and hassle-free. That’s why we created a platform that leverages
                AI to help users identify medicines, check interactions, and
                locate the nearest pharmacy—all in one place."
              </p>

              <p className="mt-5 text-[#444] leading-7">
                Since the beginning, our goal has been clear: to bridge the gap
                between people and the medications they need. Whether it’s
                scanning a prescription, verifying drug interactions, or
                connecting users with pharmacies, we are committed to making
                healthcare more accessible and informed.
              </p>

              <p className="mt-5 text-[#444] leading-7">
                We envision a future where technology empowers individuals to
                take control of their health with confidence, ensuring that
                finding and understanding medications is no longer a challenge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
