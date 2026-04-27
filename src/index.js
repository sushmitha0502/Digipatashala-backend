// import dotenv from "dotenv";
// dotenv.config();

// import db from "./database/db.js";
// import { app } from "./app.js";
// import quizRoutes from "./routes/quiz.routes.js";

// const PORT = process.env.PORT || 5000;

// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("PORT:", PORT);

// app.use("/api/quiz", quizRoutes);

// db()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`⚙️ Server is running at port : ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("mongodb connection failed !!!", err);
//   });

import dotenv from "dotenv";
dotenv.config();

import db from "../database/db.js";
import { app } from "../app.js";

// prevent multiple DB connections
let isConnected = false;

const connectDB = async () => {
  if (!isConnected) {
    await db();
    isConnected = true;
    console.log("MongoDB connected");
  }
};

// serverless handler
export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}