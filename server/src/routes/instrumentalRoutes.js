import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  createAInstrumental, 
  deleteAInstrumental, 
  getAllInstrumentals, 
  updateAInstrumental 
} from '../controllers/instrumentalControllers.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Disk storage for temporary uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Routes
router.get('/', getAllInstrumentals);

// ⚡ Make sure the field name matches frontend 'file'
router.post('/',upload.single('file'), createAInstrumental);
router.put('/:id', upload.single('file'), updateAInstrumental);

// Delete an instrumental
router.delete('/:id', deleteAInstrumental);

export default router;
