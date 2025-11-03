import mongoose from "mongoose";

const instrumentalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: { // Cloudinary URL for the uploaded beat/audio
    type: String,
    default: "",
  },
}, { timestamps: true });

const Instrumental = mongoose.model("Instrumental", instrumentalSchema);

export default Instrumental
