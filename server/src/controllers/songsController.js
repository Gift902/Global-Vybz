import Song from "../models/Song.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// 🔧 Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🟩 Get all songs
export async function getAllSongs(req, res) {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.error("❌ Error in getAllSongs controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// 🟦 Create a new song with optional audio upload
export async function createASong(req, res) {
  try {
    const { title, description } = req.body;
    let audioUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "songs",
        resource_type: "auto", // handles audio/video
      });

      audioUrl = result.secure_url;

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    const newSong = new Song({ title, description, audioUrl });
    await newSong.save();

    res.status(201).json(newSong);
  } catch (error) {
    console.error("❌ Error in createASong controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// 🟨 Update existing song (can replace audio)
export async function updateASong(req, res) {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "songs",
        resource_type: "auto",
      });
      updateData.audioUrl = result.secure_url; // ✅ use audioUrl here

      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    const updatedSong = await Song.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    console.error("❌ Error in updateASong controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// 🟥 Delete a song
export async function deleteASong(req, res) {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteASong controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
