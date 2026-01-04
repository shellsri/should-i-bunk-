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

app.use(
  cors({
    origin: "*", 
  })
);

app.use(express.json());

app.use("/api/subjects", subjectRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/deadlines", deadlineRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/bunk", bunkRoutes);


app.get("/", (req, res) => {
  res.send("Should I Bunk API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

