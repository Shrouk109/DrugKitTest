/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { PiMapPinAreaBold } from "react-icons/pi";
import { FaPhoneAlt, FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { SiGooglemaps } from "react-icons/si";

function PharmacyLocator() {
  const [userLocation, setUserLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top",
      icon,
      title,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: "#ffffff",
      color: "#333",
    });
  };

  const getUserLocation = (retries = 1) => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

   
          if (!userLocation) {
            setUserLocation({ latitude, longitude });
          }

          const savedPharmacies = localStorage.getItem("pharmaciesData");
          if (savedPharmacies) {
            setPharmacies(JSON.parse(savedPharmacies));
            setLoading(false);
          } else {
            await fetchPharmacies(latitude, longitude);
          }
        },
        (error) => {
          if (retries > 0) {
            setTimeout(() => {
              getUserLocation(retries - 1);
            }, 2000);
          } else {
            setLoading(false);
            if (error.code === error.PERMISSION_DENIED) {
              showToast("warning", "Please enable location services ");
            } else {
              showToast("error", "An error occurred while retrieving your location.");
            }
          }
        }
      );
    } else {
      showToast("error", "Your browser does not support geolocation ");
    }
  };

  const fetchPharmacies = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://drugkit.runasp.net/api/Pharmacy/nearest`,
        {
          params: {
            latitude: lat,
            longitude: lon,
          },
        }
      );
      let data = response.data;

      if (!data || data.length === 0) {
        showToast("info", "No pharmacies near your location");
      } else {
       
        data.sort((a, b) => a.distance - b.distance);
        localStorage.setItem("pharmaciesData", JSON.stringify(data));
        setPharmacies(data);
      }
    } catch (error) {
      console.error("Fetch Pharmacies Error:", error);
      showToast("error", "Unable to fetch pharmacy data ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4">
      <div className="flex flex-col items-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-5xl">
          <PiMapPinAreaBold className="text-[5rem] text-[#0a2e68] mx-auto mb-8" />

          <div className="flex justify-center">
            <button
              onClick={() => getUserLocation()}
              disabled={loading}
              className="bg-[#0a2e68] cursor-pointer hover:bg-[#050b4b] text-white text-lg font-semibold py-4 px-12 rounded-full transition-all duration-300 mb-12"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <ImSpinner2 className="animate-spin text-xl" />
                  Loading...
                </span>
              ) : (
                "Locate Me "
              )}
            </button>
          </div>

          {loading && (
            <p className="text-center text-gray-600 mb-4">
              Fetching nearby pharmacies...
            </p>
          )}

          {!loading && pharmacies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pharmacies.map((pharmacy, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-bold text-[#0a2e68] mb-2">
                    {pharmacy.name}
                  </h3>

                  <p className="text-gray-700 mb-1 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#0a2e68]" />
                    {pharmacy.address}
                  </p>

                  {pharmacy.phoneNumber && (
                    <p className="text-gray-700 mb-1 flex items-center gap-2">
                      <FaPhoneAlt className="text-[#0a2e68]" />
                      {pharmacy.phoneNumber}
                    </p>
                  )}

                  {pharmacy.distance && (
                    <p className="text-gray-700 mb-3 flex items-center gap-2">
                      <FaRoute className="text-[#0a2e68]" />
                      {Math.round(pharmacy.distance)} meters
                    </p>
                  )}

                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`,
                        "_blank"
                      )
                    }
                    className="inline-flex items-center mt-2 text-white bg-[#0a2e68] hover:bg-[#050b4b] px-4 py-2 rounded-full text-sm"
                  >
                    Show on Map <SiGooglemaps className="ml-2" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PharmacyLocator;
