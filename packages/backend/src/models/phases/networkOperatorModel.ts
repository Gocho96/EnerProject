import { Schema, model, Types } from "mongoose";

const applicationsOrSchema = new Schema(
  {
    statusApplicationOr: {
      type: String,
      enum: ["En proceso", "Aprobada", "Rechazada"],
      default: "En proceso",
    },
    applicationDateOr: {
      type: Date,
    },
    applicationNumberOr: {
      type: String,
      trim: true,
    },
    meterDeliveryDateOr: {
      type: Date,
    },
    inspectionDateOr: {
      type: Date,
    },
    approvalDateOr: {
      type: Date,
    },
  },
  { _id: true },
);

const networkOperatorSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    transformerCapacity: {
      type: Number,
    },
    transformerAvailability: {
      type: Number,
    },
    transformerNumber: {
      type: String,
      trim: true,
    },
    nameOr: {
      type: String,
      trim: true,
    },
    applicationsOr: {
      type: [applicationsOrSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const NetworkOperator = model("NetworkOperator", networkOperatorSchema);
