import { Schema, model, Types } from "mongoose";

const networkOperatorSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    applicationDateOr: {
      type: Date,
    },

    applicationNumberOr: {
      type: String,
      trim: true,
    },

    nameOr: {
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
  {
    timestamps: true,
    versionKey: false,
  }
);

export const NetworkOperator = model("NetworkOperator", networkOperatorSchema);
