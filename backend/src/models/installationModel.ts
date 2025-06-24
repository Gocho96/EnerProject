import { Schema, model, Types } from "mongoose";

const installationSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    dateInstallation: {
      type: Date,
    },

    dailyLog: [
      {
        date: { type: Date, default: Date.now },
        content: { type: String, trim: true },
        installationNews: { type: String, trim: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Installation = model("Installation", installationSchema);
