import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    lastCleanedDate: { type: String, required: true },

  },
  { timestamps: true }
);

export const Equipment = mongoose.model("Equipment", equipmentSchema);
