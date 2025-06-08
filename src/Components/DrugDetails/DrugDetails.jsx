/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function DrugDetails() {
  const location = useLocation();
  const categoryName = location?.state?.categoryName;
  let { encodedDrugName } = useParams();

  const [drugDetails, setDrugDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);


    const fetchDrugDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://drugkit.runasp.net/api/Drug/GetDrugsDetailsByName?drugName=${encodeURIComponent(
            encodedDrugName
          )}`
        );

        // console.log(data[0])
        setDrugDetails(data[0]);
      } catch (error) {
        console.log(error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [encodedDrugName]);

  return (
    <>
      <h1 className="text-4xl mb-8 pt-8 pb-1 text-center font-bold bg-gradient-to-r from-[#AA4870] via-[#C53A54] to-[#5B71C1] bg-clip-text text-transparent">
        {decodeURIComponent(encodedDrugName)}
      </h1>

      {/* <div className="flex justify-center items-center">
        <span className="mx-auto my-5 bg-[var(--primary-color)] text-[var(--third-color)] duration-700 font-semibold px-5 py-2 rounded-sm hover:shadow-[0_0_12px_rgba(26,35,126,0.5)]">
          Home / {categoryName} /{" "}
          {encodedDrugName.split(" ").slice(0, 2).join(" ")}
        </span>
      </div> */}

      {/* Drug Details */}
      <section className="bg-[var(--secondary-color)] py-16 px-4">
        {loading ? (
          <Loading />
        ) : drugDetails && (
          <div className="bg-white max-w-4xl mx-auto rounded-xl shadow-xl grid md:grid-cols-2 sm:grid-cols-2">
            {/* Image */}
            <div className="w-full">
              <img
                src={`https://drugkit.runasp.net/${drugDetails.imageUrl}`}
                alt={drugDetails.name}
                className="w-full"
              />
            </div>

            {/* Info */}
            <div className="p-6 space-y-5">
              <h2 className="text-2xl font-bold text-[var(--primary-color)]">
                {drugDetails.name}
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-700">Category:</span>{" "}
                {categoryName}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-700">Price:</span>{" "}
                {drugDetails.price} EGP
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-700">
                  Description:
                </span>{" "}
                {drugDetails.description}
              </p>
              {drugDetails.sideEffects && (
                <div className="bg-gray-100 p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Side Effects:
                  </h3>
                  <p className="text-gray-600 italic leading-relaxed">
                    {drugDetails.sideEffects}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) 
        }
      </section>
    </>
  );
}
