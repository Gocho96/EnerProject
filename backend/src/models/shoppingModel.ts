import { Schema, model, Types } from "mongoose";

const shoppingSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    materialDescription: {
      type: String,
      trim: true,
    },

    materialQuantity: {
      type: Number,
    },

    materialSupplier: {
      type: String,
      trim: true,
    },

    materialInvoice: {
      type: String,
      trim: true,
    },

    materialDate: {
      type: Date,
    },

    materialSubtotal: {
      type: Number,
    },

    materialIVA: {
      type: Number,
    },

    materialTotal: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Shopping = model("Shopping", shoppingSchema);
