import { Schema, model, Types } from "mongoose";

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

    publications: [
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

        publicationDate: {
          type: Date,
        },

        publicationUrl: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Marketing = model("Marketing", marketingSchema);
