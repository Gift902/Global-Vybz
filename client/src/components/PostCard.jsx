import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import formatDate from "../lib/utils";
import api from './lib/axios.js';
import toast from "react-hot-toast";

const PostCard = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${post._id}`);
      toast.success("Post deleted successfully!");
      onDelete(post._id); // Update parent state
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post!");
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await api.put(`/posts/${post._id}`, {
        title,
        description,
      });
      toast.success("Post updated successfully!");
      onUpdate(res.data); // Update parent state
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-neon-blue/30 transition-all duration-300 flex flex-col sm:flex-row gap-4">
      {/* Image Section */}
      {post.imageUrl && (
        <div className="shrink-0 w-full sm:w-32 h-32 sm:h-32 rounded-md overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mb-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                <FiSave /> {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                <FiX /> Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-sweet-white drop-shadow-sweet-white mb-2">
              {post.title}
            </h2>
            <p className="text-gray-400">{post.description}</p>
            <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
              <span className="text-sm text-base-content/60">
                {formatDate(new Date(post.createdAt))}
              </span>
              <div className="flex items-center gap-2">
                <FiEdit className="cursor-pointer" onClick={() => setIsEditing(true)} />
                <FiTrash2 className="cursor-pointer" onClick={handleDelete} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
