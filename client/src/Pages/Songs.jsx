import React, { useState, useEffect } from "react";
import axios from "axios";
import formatDate from "../lib/utils";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/songs");
        console.log(res.data);
        setSongs(res.data);
      } catch (error) {
        console.log("Error fetching songs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900/95 flex justify-center text-white">
      {/* Container positioned near top */}
      <div className="w-full max-w-7xl mx-auto p-6 pt-28">
        {/* Grid layout for songs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-400 text-center col-span-full">
              Loading songs...
            </p>
          ) : songs.length > 0 ? (
            songs.map((song, index) => (
              <div
                key={index}
                className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-neon-blue/30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Song Info */}
                <div>
                  <h2 className="text-lg font-semibold text-sweet-white drop-shadow-sweet-white mb-2 wrap-break-words">
                    {song.title}
                  </h2>
                  <p className="text-gray-400 mb-3 wrap-break-words">
                    {song.description}
                  </p>

                  {/* Audio player (if available) */}
                  {song.audioUrl && (
                    <audio
                      controls
                      src={song.audioUrl}
                      className="w-full mt-2 rounded-md bg-gray-900"
                    >
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>

                {/* Bottom row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
                  <span className="text-sm text-gray-400">
                    {formatDate(new Date(song.createdAt))}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No songs available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Songs;
