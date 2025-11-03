import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: { // new field to store Cloudinary URL
    type: String,
    default: "",
  },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post
