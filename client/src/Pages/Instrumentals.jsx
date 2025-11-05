import React, { useState, useEffect } from "react";
import api from '../lib/axios.js';
import formatDate from "../lib/utils";

const Instrumentals = () => {
  const [instrumentals, setInstrumentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstrumentals = async () => {
      try {
        const res = await api.get("/instrumentals");
        setInstrumentals(res.data);
      } catch (error) {
        console.log("Error fetching instrumentals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstrumentals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900/95 flex justify-center text-white">
      <div className="w-full max-w-7xl mx-auto p-6 pt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-400 text-center col-span-full">
              Loading instrumentals...
            </p>
          ) : instrumentals.length > 0 ? (
            instrumentals.map((instrumental, index) => (
              <div
                key={index}
                className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-neon-blue/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Instrumental Info */}
                <div>
                  <h2 className="text-lg font-semibold text-sweet-white drop-shadow-sweet-white mb-2 truncate">
                    {instrumental.title}
                  </h2>
                  <p className="text-gray-400 mb-3">
                    {instrumental.description}
                  </p>

                  {/* Audio player */}
                  {instrumental.fileUrl && (
                    <audio
                      controls
                      className="w-full mt-2 rounded-md bg-gray-900"
                      src={instrumental.fileUrl}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>

                {/* Bottom row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
                  <span className="text-sm text-gray-400">
                    {formatDate(new Date(instrumental.createdAt))}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No instrumentals available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Instrumentals;
