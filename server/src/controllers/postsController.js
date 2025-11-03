import Post from '../models/Post.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Load .env first

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getAllPosts controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// Create a new post with optional image
export async function createAPost(req, res) {
  try {
    const { title, description } = req.body;
    let imageUrl = "";

    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      imageUrl = result.secure_url;

      // Remove local file
      fs.unlinkSync(req.file.path);
    }

    const newPost = new Post({ title, description, imageUrl });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createAPost controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// Update post (with optional new image)
export async function updateAPost(req, res) {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      updateData.imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error in updateAPost controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// Delete a post
export async function deleteAPost(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAPost controller", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
