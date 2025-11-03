import express from 'express';
import PostsRoutes from './routes/PostsRoutes.js';
import songsRoutes from './routes/songsRoutes.js';
import instrumentalRoutes from './routes/instrumentalRoutes.js';
import adminAuthRoutes from './routes/adminAuth.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from "cors";
import cloudinary from './config/cloudinaryConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use('/api/posts', PostsRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/instrumentals', instrumentalRoutes);
app.use("/api/admin", adminAuthRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
});
