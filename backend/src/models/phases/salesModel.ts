import { Schema, model, Types } from "mongoose";

const salesRecordSchema = new Schema(
  {
    saleNumber: {
      type: String,
      trim: true,
      required: true,
    },
    saleClient: {
      type: String,
      trim: true,
      required: true,
    },
    saleDate: {
      type: Date,
      required: true,
    },
    saleConcept: {
      type: String,
      trim: true,
      required: true,
    },
    saleSubtotal: {
      type: Number,
      required: true,
    },
    saleIVA: {
      type: Number,
      required: true,
    },
    saleTotal: {
      type: Number,
      required: true,
    },
    saleStatus: {
      type: String,
      enum: ["pending", "paid", "overdue"],
      default: "pending",
    },
    saleDueDate: {
      type: Date,
      default: null,
    },
    salePaymentDate: {
      type: Date,
      default: null,
    },
  },
  { _id: true }
);

const salesSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    salesRecords: {
      type: [salesRecordSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Sales = model("Sales", salesSchema);
