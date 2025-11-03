// seedAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "./src/models/Admin.js";
import dotenv from 'dotenv';

dotenv.config();
// connect to your existing DB
mongoose.connect(process.env.MONGO_URI); 

const createAdmin = async () => {
  try {
    const existing = await Admin.findOne({ username: "admin" });
    if (existing) {
      console.log("✅ Admin already exists, skipping creation.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("YourStrongPassword123", 10);
    await Admin.create({ username: "admin", password: hashedPassword });

    console.log("✅ Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
