import express from "express";
import Timetable from "../models/Timetable.js";

const router = express.Router();

// GET full timetable
router.get("/", async (req, res) => {
  try {
    const data = await Timetable.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD slot
router.post("/", async (req, res) => {
  const { day, time, subject } = req.body;

  try {
    let timetable = await Timetable.findOne({ day });

    if (!timetable) {
      timetable = new Timetable({ day, slots: [] });
    }

    timetable.slots.push({ time, subject });
    await timetable.save();

    res.json({ message: "Slot added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE a slot
router.put("/slot/:slotId", async (req, res) => {
  const { time, subject } = req.body;

  try {
    const timetable = await Timetable.findOne({
      "slots._id": req.params.slotId,
    });

    if (!timetable) {
      return res.status(404).json({ message: "Slot not found" });
    }

    const slot = timetable.slots.id(req.params.slotId);
    slot.time = time;
    slot.subject = subject;

    await timetable.save();
    res.json({ message: "Slot updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a slot
router.delete("/slot/:slotId", async (req, res) => {
  try {
    const timetable = await Timetable.findOne({
      "slots._id": req.params.slotId,
    });

    if (!timetable) {
      return res.status(404).json({ message: "Slot not found" });
    }

    timetable.slots = timetable.slots.filter(
      (s) => s._id.toString() !== req.params.slotId
    );

    await timetable.save();
    res.json({ message: "Slot deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
