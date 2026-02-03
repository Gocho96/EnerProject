import { Schema, model, Types } from "mongoose";

const purchaseRecordSchema = new Schema(
  {
    purchaseNumber: {
      type: String,
      trim: true,
      required: true,
    },
    purchaseProvider: {
      type: String,
      trim: true,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    purchaseConcept: {
      type: String,
      trim: true,
      required: true,
    },
    purchaseSubtotal: {
      type: Number,
      min: 0,
      required: true,
    },
    purchaseIva: {
      type: Number,
      min: 0,
      required: true,
    },
    purchaseTotal: {
      type: Number,
      min: 0,
      required: true,
    },
    purchaseStatus: {
      type: String,
      enum: ["pending", "paid", "overdue"],
      default: "pending",
    },
    purchaseDueDate: {
      type: Date,
    },
  },
  { _id: true }
);

const purchaseSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    purchaseRecords: { 
      type: [purchaseRecordSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Purchase = model("Purchase", purchaseSchema);
