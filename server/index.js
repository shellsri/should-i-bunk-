import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bunkRoutes from "./routes/bunk.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";
import deadlineRoutes from "./routes/deadline.routes.js";
import healthRoutes from "./routes/health.routes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/subjects", subjectRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/deadlines", deadlineRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/bunk", bunkRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
