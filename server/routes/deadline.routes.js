import express from "express";
import Deadline from "../models/Deadline.js";

const router = express.Router();

// GET all deadlines
router.get("/", async (req, res) => {
  const deadlines = await Deadline.find().sort({ date: 1 });
  res.json(deadlines);
});

// ADD deadline
router.post("/", async (req, res) => {
  const deadline = await Deadline.create({
    title: req.body.title,
    subject: req.body.subject,
    date: req.body.date,
    priority: req.body.priority,
    completed: false,
  });

  res.json(deadline);
});

// UPDATE / MARK / EDIT (FIXED)
router.put("/:id", async (req, res) => {
  const updated = await Deadline.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        subject: req.body.subject,
        date: req.body.date,
        priority: req.body.priority,
        completed:
          typeof req.body.completed === "boolean"
            ? req.body.completed
            : false,
      },
    },
    { new: true }
  );

  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Deadline.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
