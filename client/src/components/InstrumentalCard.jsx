import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import formatDate from "../lib/utils";
import api from './lib/axios.js';
import toast from "react-hot-toast";

const InstrumentalCard = ({ instrumental, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(instrumental.title);
  const [description, setDescription] = useState(instrumental.description);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // preview before upload
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/instrumentals/${instrumental._id}`);
      toast.success("Instrumental deleted successfully!");
      onDelete(instrumental._id);
    } catch (error) {
      console.error("Error deleting instrumental:", error);
      toast.error("Failed to delete instrumental!");
    }
  };

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
      if (file) formData.append("file", file);

      const res = await api.put(
        `/instrumentals/${instrumental._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Instrumental updated successfully!");
      onUpdate(res.data);
      setIsEditing(false);
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error updating instrumental:", error);
      toast.error("Failed to update instrumental!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // show preview
    }
  };

  return (
    <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-neon-blue/30 transition-all duration-300 flex flex-col gap-3">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Audio Upload */}
          <div>
            <label className="block text-gray-200 mb-1">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full text-gray-200"
            />
          </div>

          {/* Preview selected file */}
          {preview && (
            <audio
              controls
              className="w-full mt-2 rounded-md bg-gray-900"
              src={preview}
            >
              Your browser does not support the audio element.
            </audio>
          )}

          <div className="flex gap-2 flex-wrap">
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
                setTitle(instrumental.title);
                setDescription(instrumental.description);
                setFile(null);
                setPreview(null);
              }}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              <FiX /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-sweet-white drop-shadow-sweet-white mb-2 truncate">
            {instrumental.title}
          </h2>
          <p className="text-gray-400 mb-2">{instrumental.description}</p>

          {/* Audio Playback */}
          {instrumental.fileUrl && (
            <audio controls className="w-full mb-2">
              <source src={instrumental.fileUrl} />
              Your browser does not support the audio element.
            </audio>
          )}

          <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(instrumental.createdAt))}
            </span>
            <div className="flex items-center gap-2">
              <FiEdit className="cursor-pointer" onClick={() => setIsEditing(true)} />
              <FiTrash2 className="cursor-pointer" onClick={handleDelete} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InstrumentalCard;
