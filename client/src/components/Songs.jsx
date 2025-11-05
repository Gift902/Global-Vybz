import { useState } from "react";
import toast from "react-hot-toast";
import api from '../lib/axios.js';

const Songs = ({ addSong }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required!");
      return;
    }

    if (!file) {
      toast.error("Please upload an audio file!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file); // <-- matches backend multer field

      const res = await api.post("/songs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Add song to parent state
      addSong(res.data);

      toast.success("Song uploaded successfully!");

      // Reset form fields
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading song:", error);
      toast.error("Failed to upload song!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700 max-w-lg mx-auto"
    >
      <h3 className="text-2xl font-semibold text-gray-100 mb-3">
        Upload New Song
      </h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Song Description"
        rows="4"
        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="w-full text-gray-300"
      />

      {/* Audio preview */}
      {preview && (
        <audio
          controls
          className="w-full mt-2 rounded-md bg-gray-900"
          src={preview}
        >
          Your browser does not support the audio element.
        </audio>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all shadow hover:shadow-blue-500/30 ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Uploading..." : "Upload Song"}
      </button>
    </form>
  );
};

export default Songs;
