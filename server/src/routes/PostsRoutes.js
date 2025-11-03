import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getAllPosts,
  createAPost,
  updateAPost,
  deleteAPost
} from '../controllers/postsController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get('', getAllPosts);
router.post('', upload.single('file'), createAPost);
router.put('/:id', upload.single('file'), updateAPost);
router.delete('/:id', deleteAPost);

export default router;
