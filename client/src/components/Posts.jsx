import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Posts = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const res = await axios.post("http://localhost:5001/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      addPost(res.data);
      toast.success("Post created successfully!");

      // reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700 max-w-xl mx-auto"
    >
      <h3 className="text-2xl font-semibold text-gray-100 mb-3">Add New Post</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Post Description"
        rows="4"
        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full text-gray-300"
      />

      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded-md border border-gray-600 object-contain"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all shadow hover:shadow-blue-500/30 ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Uploading..." : "Upload Post"}
      </button>
    </form>
  );
};

export default Posts;
