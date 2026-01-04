import mongoose from "mongoose";

const DeadlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  date: { type: String, required: true }, // ✅ MUST be "date"
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Deadline", DeadlineSchema);

