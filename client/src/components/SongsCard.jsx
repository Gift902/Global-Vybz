import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import formatDate from "../lib/utils";
import api from './lib/axios.js';
import toast from "react-hot-toast";

const SongsCard = ({ song, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🟥 Delete Song
  const handleDelete = async () => {
    try {
      await api.delete(`/songs/${song._id}`);
      toast.success("Song deleted successfully!");
      onDelete(song._id);
    } catch (error) {
      console.error("Error deleting song:", error);
      toast.error("Failed to delete song!");
    }
  };

  // 🟨 Update Song (including optional audio)
  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) formData.append("audio", file); // must match backend field

      const res = await api.put(
        `/songs/${song._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Song updated successfully!");
      onUpdate(res.data);
      setIsEditing(false);
      setFile(null);
    } catch (error) {
      console.error("Error updating song:", error);
      toast.error("Failed to update song!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-neon-blue/30 transition-all duration-300 flex flex-col gap-4 w-full max-w-full sm:max-w-md mx-auto">
      {isEditing ? (
        // ✏️ Edit Mode
        <div className="space-y-3 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song title"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Song description"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Optional audio update */}
          <div>
            <label className="block text-gray-200 mb-1">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-gray-200"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              <FiSave /> {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(song.title);
                setDescription(song.description);
                setFile(null);
              }}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              <FiX /> Cancel
            </button>
          </div>
        </div>
      ) : (
        // 🎵 Normal View
        <>
          <h2 className="text-lg font-semibold text-sweet-white drop-shadow-sweet-white wrap-break-words">
            {song.title}
          </h2>
          <p className="text-gray-400 wrap-break-words">{song.description}</p>

          {/* 🎧 Audio Player */}
          {song.audioUrl && (
            <audio controls src={song.audioUrl} className="w-full mt-2 rounded-md bg-gray-900" />
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
            <span className="text-sm text-gray-500">
              {formatDate(new Date(song.createdAt))}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-300 hover:text-blue-400 transition-all"
                aria-label="Edit Song"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-300 hover:text-red-400 transition-all"
                aria-label="Delete Song"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SongsCard;
