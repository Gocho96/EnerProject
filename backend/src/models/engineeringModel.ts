import { Schema, model, Types } from "mongoose";

const engineeringSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    
    statusElectricalPlan: {
      type: Boolean,
      required: true,
      default: false,
    },

    dateElectricalPlan: {
      type: Date,
    },

    statusConstructionPlan: {
      type: Boolean,
      required: true,
      default: false,
    },

    dateConstructionPlan: {
      type: Date,
    },

    statusUnifilar: {
      type: Boolean,
      required: true,
      default: false,
    },

    dateUnifilar: {
      type: Date,
    },

    statusPlantModel: {
      type: Boolean,
      required: true,
      default: false,
    },

    datePlantModel: {
      type: Date,
    },

    statusMemories: {
      type: Boolean,
      required: true,
      default: false,
    },

    dateMemories: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Engineering = model("Engineering", engineeringSchema);
