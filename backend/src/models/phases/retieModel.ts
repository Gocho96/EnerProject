import { Schema, model, Types } from "mongoose";

const retieSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    applicationDateRetie: {
      type: Date,
    },
    commercialOfferNumberRetie: {
      type: String,
      trim: true,
    },
    providerRetie: {
      type: String,
      trim: true,
    },
    paymentDateRetie: {
      type: Date,
    },
    inspectionDateRetie: {
      type: Date,
    },
    dictamenDateRetie: {
      type: Date,
    },
    dictamenNumberRetie: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Retie = model("Retie", retieSchema);
