/* eslint-disable */
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
          const currentLocation = { latitude, longitude };
          setUserLocation(currentLocation);

          const savedData = localStorage.getItem("pharmaciesData");
          const saved = savedData ? JSON.parse(savedData) : null;

          if (
            saved &&
            saved.location &&
            Math.abs(saved.location.latitude - latitude) < 0.001 &&
            Math.abs(saved.location.longitude - longitude) < 0.001
          ) {
            setPharmacies(saved.pharmacies);
            setLoading(false);
          } else {
            await fetchPharmacies(latitude, longitude);
          }
        },
        (error) => {
          setLoading(false);
          if (retries > 0) {
            setTimeout(() => getUserLocation(retries - 1), 2000);
          } else {
            if (error.code === error.PERMISSION_DENIED) {
              showToast("warning", "Please enable location services");
            } else {
              showToast(
                "error",
                "An error occurred while retrieving your location."
              );
            }
          }
        }
      );
    } else {
      showToast("error", "Your browser does not support geolocation");
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
        localStorage.setItem(
          "pharmaciesData",
          JSON.stringify({
            pharmacies: data,
            location: { latitude: lat, longitude: lon },
          })
        );
        setPharmacies(data);
      }
    } catch (error) {
      console.error("Fetch Pharmacies Error:", error);
      showToast("error", "Unable to fetch pharmacy data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-4 bg-[#f7faff] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full">
        <div className="bg-white  p-5 md:p-8 rounded-2xl shadow-lg w-full max-w-3xl border border-[#e3eaff] mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#0a2e68] rounded-full p-3 mb-3 shadow">
              <PiMapPinAreaBold className="text-3xl md:text-4xl text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#0a2e68] mb-1">
              Find Nearby Pharmacies
            </h1>
            <p className="text-gray-500 text-sm md:text-base mb-2 text-center max-w-md">
              Locate the closest pharmacies to you and get directions easily.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => getUserLocation()}
              disabled={loading}
              className="bg-[#0a2e68] hover:bg-[#183a7a] text-white text-base font-semibold py-3 px-8 rounded-full transition-all duration-200 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <ImSpinner2 className="animate-spin text-lg" />
                  Locating...
                </span>
              ) : (
                <>
                  <PiMapPinAreaBold className="text-lg" />
                  Locate Me
                </>
              )}
            </button>
          </div>

          {loading && (
            <p className="text-center text-[#0a2e68] mb-4 animate-pulse font-medium text-sm">
              Fetching nearby pharmacies...
            </p>
          )}

          {!loading && pharmacies.length > 0 && (
            <div className="space-y-4">
              {pharmacies.map((pharmacy, index) => (
                <div
                  key={index}
                  className="bg-[#f7faff] p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2 border border-[#e3eaff]"
                >
                  <div>
                    <h3 className="text-base font-bold text-[#0a2e68] mb-1 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[#c33c54] text-base" />
                      {pharmacy.name}
                    </h3>
                    <p className="text-gray-700 mb-1 flex items-center gap-1 text-xs">
                      <FaMapMarkerAlt className="text-[#0a2e68]" />
                      {pharmacy.address}
                    </p>
                    {pharmacy.phoneNumber && (
                      <p className="text-gray-700 mb-1 flex items-center gap-1 text-xs">
                        <FaPhoneAlt className="text-[#0a2e68]" />
                        {pharmacy.phoneNumber}
                      </p>
                    )}
                    {pharmacy.distance && (
                      <p className="text-gray-700 flex items-center gap-1 text-xs">
                        <FaRoute className="text-[#0a2e68]" />
                        {Math.round(pharmacy.distance)} meters
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`,
                        "_blank"
                      )
                    }
                    className="inline-flex items-center text-white bg-[#0a2e68] hover:bg-[#183a7a] px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 gap-1 shadow"
                  >
                    Map <SiGooglemaps className="ml-1 text-base" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && pharmacies.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <p>No pharmacies found near your location yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PharmacyLocator;
