import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  attended: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  minAttendance: {
    type: Number,
    default: 75
  }
});

export default mongoose.model("Subject", subjectSchema);
