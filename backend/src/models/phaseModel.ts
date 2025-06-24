import { Schema, model, Types } from "mongoose";

const phaseSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    phaseName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["En progreso", "Pausado", "Completado", "N/A"],
      default: "En progreso",
      required: true,
    },
  },
  {
  timestamps: true,
  versionKey: false,
  }
);

export const Phase = model("Phase", phaseSchema);
