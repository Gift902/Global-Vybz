import Instrumental from '../models/Instrumental.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// 🔧 Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🟩 Get all instrumentals
export async function getAllInstrumentals(req, res) {
  try {
    const instrumentals = await Instrumental.find().sort({ createdAt: -1 });
    res.status(200).json(instrumentals);
  } catch (error) {
    console.error("❌ Error in getAllInstrumentals controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// 🟦 Create a new instrumental with optional audio upload
export async function createAInstrumental(req, res) {
  try {
    const { title, description } = req.body;
    let fileUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "instrumentals",
        resource_type: "auto", // supports audio/video
      });

      fileUrl = result.secure_url;

      // Remove local temp file
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    }

    const newInstrumental = new Instrumental({ title, description, fileUrl });
    await newInstrumental.save();

    res.status(201).json(newInstrumental);
  } catch (error) {
    console.error("❌ Error in createAInstrumental controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// 🟨 Update an existing instrumental (can replace audio)
export async function updateAInstrumental(req, res) {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "instrumentals",
        resource_type: "auto",
      });
      updateData.fileUrl = result.secure_url;

      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    }

    const updatedInstrumental = await Instrumental.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedInstrumental)
      return res.status(404).json({ message: "Instrumental not found" });

    res.status(200).json(updatedInstrumental);
  } catch (error) {
    console.error("❌ Error in updateAInstrumental controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

// 🟥 Delete an instrumental
export async function deleteAInstrumental(req, res) {
  try {
    const deletedInstrumental = await Instrumental.findByIdAndDelete(req.params.id);
    if (!deletedInstrumental)
      return res.status(404).json({ message: "Instrumental not found" });

    res.status(200).json({ message: "Instrumental deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteAInstrumental controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
