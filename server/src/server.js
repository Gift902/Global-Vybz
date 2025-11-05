import express from 'express';
import PostsRoutes from './routes/PostsRoutes.js';
import songsRoutes from './routes/songsRoutes.js';
import instrumentalRoutes from './routes/instrumentalRoutes.js';
import adminAuthRoutes from './routes/adminAuth.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from "cors";
import cloudinary from './config/cloudinaryConfig.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

connectDB();
app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use('/api/posts', PostsRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/instrumentals', instrumentalRoutes);
app.use("/api/admin", adminAuthRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../client/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../client","dist","index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
