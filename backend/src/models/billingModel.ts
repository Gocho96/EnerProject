import { Schema, model, Types } from "mongoose";

const billingSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    billingNumber: {
      type: String,
      trim: true,
      required: true,
    },

    billingDate: {
      type: Date,
      required: true,
    },

    billingConcept: {
      type: String,
      trim: true,
      required: true,
    },

    billingSubtotal: {
      type: Number,
      min: 0,
      required: true,
    },

    billingIva: {
      type: Number,
      min: 0,
      required: true,
    },

    billingTotal: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Billing = model("Billing", billingSchema);
