import express from "express";
import multer from "multer";
import {
  getAllSongs,
  createASong,
  updateASong,
  deleteASong,
} from "../controllers/songsController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// 🧩 Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // temp folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 🛠️ Routes
router.get("/", getAllSongs);
router.post("/",upload.single("file"), createASong);
router.put("/:id", upload.single("file"), updateASong);
router.delete("/:id", deleteASong);

export default router;
