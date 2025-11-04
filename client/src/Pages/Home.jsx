import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import api from './lib/axios.js';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import formatDate from "../lib/utils";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log("Error fetching posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900/95 text-white flex flex-col items-center">
      {/* Container positioned near top */}
      <div className="w-full max-w-7xl mx-auto p-6 pt-28">
        {/* Grid layout for posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-neon-blue/30 transition-all duration-300"
              >
                {/* Display image if available */}
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}

                <h2 className="text-lg font-semibold text-sweet-white drop-shadow-sweet-white mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-400">{post.description}</p>

                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm text-base-content/60">
                    {formatDate(new Date(post.createdAt))}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No posts available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
