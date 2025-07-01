import { Schema, model, Types } from "mongoose";

const counterSchema = new Schema({
  projectId: {
    type: Types.ObjectId,
    required: true,
    ref: "Project",
  },

  module: {
    type: String,
    required: true,
  },

  value: {
    type: Number,
    default: 0,
  },
  
}, { timestamps: true });

counterSchema.index({ projectId: 1, module: 1 }, { unique: true });

export const Counter = model("Counter", counterSchema);
