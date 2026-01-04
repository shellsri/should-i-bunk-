import express from "express";
import Subject from "../models/Subject.js";
import Deadline from "../models/Deadline.js";
import { calculateHealth } from "../utils/healthCalculator.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  const deadlines = await Deadline.find();

  const data = calculateHealth(subjects, deadlines);
  res.json(data);
});

export default router;


