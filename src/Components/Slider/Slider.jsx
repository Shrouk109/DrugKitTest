/*eslint-disable*/
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PiMapPinAreaBold } from "react-icons/pi";
import {
  MdOutlineQrCodeScanner,
  MdOutlineDocumentScanner,
} from "react-icons/md";
import { TbBrandWechat } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";

import { FaPills } from "react-icons/fa";

const categories = [
  {
    name: "Search for Any Medication",
    description:
      "Find any drug using our smart search bar or scan a prescription.",
    icon: <IoMdSearch />,
  },
  {
    name: "Interaction Checker",
    description:
      "Enter two medications to check interactions and get safer alternatives instantly.",
    icon: <FaPills />,
  },
  {
    name: "Prescription Scanner",
    description:
      "Take a picture of your prescription, and let our system instantly recognize the medications.",
    icon: <MdOutlineDocumentScanner />,
  },
  {
    name: "Barcode Scanner",
    description:
      "Use your phone’s camera to scan barcodes and get detailed drug information in seconds.",
    icon: <MdOutlineQrCodeScanner />,
  },
  {
    name: "Pharmacy Locator",
    description:
      "Enable location access to detect nearby pharmacies and get a navigation link.",
    icon: <PiMapPinAreaBold />,
  },
  {
    name: "AI Chatbot",
    description:
      "Enter your symptoms, and the bot suggests a suitable medication with doctor advice.",
    icon: <TbBrandWechat />,
  },
];

export default function Slider() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-10">
      <Swiper
        slidesPerView={1}
        watchOverflow={true}
        breakpoints={{
          576: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1200: { slidesPerView: 3, spaceBetween: 50 },
        }}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        style={{ paddingBottom: "40px" }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className="h-full flex">
            <div className="w-full max-w-md p-6 bg-white  border border-[#f2f2f2] shadow-lg hover:shadow-lg duration-700 rounded-lg text-center transition-shadow flex flex-col items-center min-h-[200px]">
              {/* icon */}
              <div className="w-16 h-16 bg-[var(--secondary-color)] flex items-center justify-center rounded-full mb-3">
                <span className="text-[var(--primary-color)] text-3xl">
                  {category.icon}
                </span>
              </div>

              {/* title */}
              <h3 className="text-base font-semibold text-[var(--primary-color)] mb-1">
                {category.name}
              </h3>

              {/* desc */}
              <p className="text-gray-600 leading-relaxed text-xs">{category.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
