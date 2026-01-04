import express from "express";
import Subject from "../models/Subject.js";
import Deadline from "../models/Deadline.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    const deadlines = await Deadline.find();

    let risky = false;

    subjects.forEach((s) => {
      if (s.total === 0) return;
      const percent = (s.attended / s.total) * 100;
      if (percent <= s.minAttendance) risky = true;
    });

    const now = new Date();
    const urgentDeadline = deadlines.some((d) => {
      const diff = (new Date(d.date) - now) / (1000 * 60 * 60);
      return diff <= 48 && !d.completed;
    });

    let decision = "Up to you";
    let reason = "Attendance and deadlines are balanced.";

    if (risky) {
      decision = "Do NOT bunk";
      reason = "Attendance is at risk.";
    } else if (urgentDeadline) {
      decision = "You MAY bunk";
      reason = "Upcoming deadlines need attention.";
    }

    res.json({ decision, reason });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;


