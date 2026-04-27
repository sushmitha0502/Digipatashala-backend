import mongoose from "mongoose";

let isConnected = false;

const db = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });

    isConnected = connection.connections[0].readyState === 1;

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default db;

// const mongoose = require("mongoose");
// let isConnected=false;
// async function db() {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     isConnected=true;
//   } catch (err) {
//     console.error("❌ MongoDB connection failed:", err.message);
//     process.exit(1);
//   }
// }

// module.exports = db;