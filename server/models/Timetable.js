import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  time: String,
  subject: String,
});

const timetableSchema = new mongoose.Schema({
  day: String,
  slots: [slotSchema],
});

export default mongoose.model("Timetable", timetableSchema);

