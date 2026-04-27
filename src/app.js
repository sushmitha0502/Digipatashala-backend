// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // routes
// import studentRouter from "./routes/student.routes.js";
// import teacherRouter from "./routes/teacher.routes.js";
// import courseRouter from "./routes/course.routes.js";
// import adminRouter from "./routes/admin.routes.js";
// import ruralLearningRouter from "./routes/ruralLearning.routes.js";
// import quizRouter from "./routes/quiz.routes.js";
// import learningPacketRouter from "./routes/learningPacket.routes.js";
// import assignmentRouter from "./routes/assignment.routes.js";
// import progressTrackingRouter from "./routes/progressTracking.routes.js";

// app.use("/api/student", studentRouter);
// app.use("/api/teacher", teacherRouter);
// app.use("/api/course", courseRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/rural-learning", ruralLearningRouter);
// app.use("/api/quiz", quizRouter);
// app.use("/api/learning-packets", learningPacketRouter);
// app.use("/api/assignments", assignmentRouter);
// app.use("/api/progress", progressTrackingRouter);

// export { app };

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ✅ Allow both local + deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://digipatashala-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

// ✅ Handle preflight requests (VERY IMPORTANT for Vercel)
app.options("*", cors());

// ✅ Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ Prevent favicon crash (optional but helpful)
app.get("/favicon.ico", (req, res) => res.status(204));

// ✅ Routes
import studentRouter from "./routes/student.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import courseRouter from "./routes/course.routes.js";
import adminRouter from "./routes/admin.routes.js";
import ruralLearningRouter from "./routes/ruralLearning.routes.js";
import quizRouter from "./routes/quiz.routes.js";
import learningPacketRouter from "./routes/learningPacket.routes.js";
import assignmentRouter from "./routes/assignment.routes.js";
import progressTrackingRouter from "./routes/progressTracking.routes.js";

app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/course", courseRouter);
app.use("/api/admin", adminRouter);
app.use("/api/rural-learning", ruralLearningRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/learning-packets", learningPacketRouter);
app.use("/api/assignments", assignmentRouter);
app.use("/api/progress", progressTrackingRouter);

export { app };