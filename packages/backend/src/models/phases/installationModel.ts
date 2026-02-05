import { Schema, model, Types } from "mongoose";

const dailyLogSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      trim: true,
    },
    installationNews: {
      type: String,
      trim: true,
    },
  },
  { _id: true } 
);

const installationSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    dailyLog: { 
      type: [dailyLogSchema],
      default: [],
    }, 
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Installation = model("Installation", installationSchema);
