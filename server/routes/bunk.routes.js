import express from "express";
import Subject from "../models/Subject.js";
import Deadline from "../models/Deadline.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    const deadlines = await Deadline.find();

    let risky = false;
    let nearLimit = false;

    subjects.forEach((s) => {
      if (s.total === 0) return;

      const percent = (s.attended / s.total) * 100;
      const buffer = percent - s.minAttendance;

      if (buffer < 0) risky = true;
      else if (buffer <= 5) nearLimit = true;
    });

    const now = new Date();
    const urgentDeadline = deadlines.some((d) => {
      const diffHours =
        (new Date(d.date) - now) / (1000 * 60 * 60);
      return diffHours <= 48 && !d.completed;
    });

    let decision = "UP_TO_YOU";
    let confidence = "LOW";
    let reason = "Attendance and deadlines are balanced.";
    let insights = [];

    if (risky) {
      decision = "DONT_BUNK";
      confidence = "HIGH";
      reason = "Attendance is below minimum.";
      insights.push("📉 Attendance is below safe limit");
    } 
    else if (nearLimit && urgentDeadline) {
      decision = "DONT_BUNK";
      confidence = "MEDIUM";
      reason = "Low attendance buffer and deadlines are close.";
      insights.push("⚠️ Attendance buffer is low");
      insights.push("⏰ Deadline within 48 hours");
    }
    else if (nearLimit) {
      decision = "UP_TO_YOU";
      confidence = "MEDIUM";
      reason = "Attendance buffer is low.";
      insights.push("⚠️ Attendance close to minimum");
    }
    else if (urgentDeadline) {
      decision = "UP_TO_YOU";
      confidence = "MEDIUM";
      reason = "Upcoming deadline within 48 hours.";
      insights.push("⏰ Deadline due soon");
    }
    else {
      decision = "BUNK";
      confidence = "HIGH";
      reason = "Attendance is safe and no urgent deadlines.";
      insights.push("📊 Attendance is healthy");
      insights.push("✅ No urgent deadlines");
    }

    res.json({
      decision,
      confidence,
      reason,
      insights,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
