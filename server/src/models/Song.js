import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  audioUrl: { // new field for Cloudinary audio URL
    type: String,
    default: "",
  },
}, { timestamps: true });

const Song = mongoose.model("Song", songSchema);

export default Song
