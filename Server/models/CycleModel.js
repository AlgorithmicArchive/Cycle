import mongoose from "mongoose";

const cycleSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  startDay: {
    type: Number,
    required: true,
  },
  startMonth: {
    type: Number,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endDay: {
    type: Number,
    required: true,
  },
  endMonth: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
  afterDays: {
    type: Number,
    required: true,
  },
});

// Create a Mongoose model based on the schema
const Cycle = mongoose.model("Cycle", cycleSchema, "Cycle");

export default Cycle;
