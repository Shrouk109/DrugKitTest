/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function Alternatives() {
  const { drugName } = useParams();
  const navigate = useNavigate();
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAlternatives = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token not found');
      }

      const { data } = await axios.get(
        `https://drugkit.runasp.net/api/Drug/GetDrugsRecomendationByDrugName?drugName=${encodeURIComponent(drugName)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        }
      );
      
      setAlternatives(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch alternatives');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlternatives();
  }, [drugName]);

  const handleViewDetails = (alternativeName) => {
    const encodedName = encodeURIComponent(alternativeName);
    navigate(`/drugdetails/${encodedName}`);
  };

  return (
    <div>
      <h1 className="text-3xl pt-16 text-center font-bold bg-gradient-to-r from-[#AA4870] from-[30%] via-[#C53A54] via-[20%] to-[#5B71C1] to-[80%] bg-clip-text text-transparent">
      Alternatives for {decodeURIComponent(drugName)}
      </h1>

      <section className="py-20 ">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg animate-pulse"
              >
                <div className="w-full h-40 bg-gray-300 rounded-t-lg" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
            {alternatives.map((alt) => {
              const altName = alt.name.split(" ").slice(0, 2).join(" ");
              return (
                <div
                  key={alt.id}
                  className="bg-white shadow-lg rounded-lg hover:cursor-pointer hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] transition-all"
                  onClick={() => handleViewDetails(alt.name)}
                >
                  <img
                    src={`https://drugkit.runasp.net/${alt.imageUrl}`}
                    alt={alt.name}
                    className="w-full rounded-t-lg"
                  />
                  <div className="p-2 text-center">
                    <h3 className="text-lg font-bold text-[var(--primary-color)] truncate">
                      {altName}
                    </h3>
                    <p className="text-gray-600 mt-1 font-semibold">
                      {alt.price} EGP
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
