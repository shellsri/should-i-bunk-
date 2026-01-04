import express from "express";
import Subject from "../models/Subject.js";

const router = express.Router();

/**
 * MARK ATTENDANCE
 * present = true  → attended +1, total +1
 * present = false → total +1
 */
router.post("/mark", async (req, res) => {
  const { subjectName, present } = req.body;

  try {
    let subject = await Subject.findOne({ name: subjectName });

    // Auto-create subject if not exists
    if (!subject) {
      subject = new Subject({
        name: subjectName,
        attended: 0,
        total: 0,
        minAttendance: 75,
      });
    }

    subject.total += 1;
    if (present) subject.attended += 1;

    await subject.save();

    res.json({ message: "Attendance updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
