import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,

    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    typeOfService: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      enum: ["Finalizado", "En curso", "Pendiente", "Cancelado"],
      required: true,
      default: "Pendiente",
    },

    startContract: {
      type: Date,
    },

    endContract: {
      type: Date,
    },

    nextMaintenance: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Project = model("Project", projectSchema);
