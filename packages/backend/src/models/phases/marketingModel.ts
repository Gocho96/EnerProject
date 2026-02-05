import { Schema, model, Types } from "mongoose";

const publicationSchema = new Schema(
  {
    platform: {
      type: String,
      trim: true,
      enum: [
        "Facebook",
        "Instagram",
        "Youtube",
        "TikTok",
        "LinkedIn",
        "Sitio web",
        "Otro",
      ],
    },
    publicationTitle: {
      type: String,
      trim: true,
    },
    publicationDate: {
      type: Date,
    },
    publicationUrl: {
      type: String,
      trim: true,
    },
  },
  { _id: true },
);

const marketingSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    sendSurvey: {
      type: Boolean,
      required: true,
      default: false,
    },
    sendSurveyDate: {
      type: Date,
    },
    website: {
      type: Boolean,
      required: true,
      default: false,
    },
    successStorie: {
      type: Boolean,
      required: true,
      default: false,
    },
    award: {
      type: Boolean,
      required: true,
      default: false,
    },
    publications: {
      type: [publicationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Marketing = model("Marketing", marketingSchema);
