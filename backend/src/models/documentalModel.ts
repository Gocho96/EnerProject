import { Schema, model, Types } from "mongoose";

const policySchema = new Schema(
  {
    policyType: {
      type: String,
      enum: [
        "Cumplimiento",
        "Estabilidad y calidad",
        "Buen manejo del anticipo",
        "Prestaciones sociales",
        "Responsabilidad civil",
        "Montaje",
      ],
      required: true,
    },
    policyNumber: { type: String, required: true },
    policyValue: { type: Number, required: true },
    policyDate: { type: Date, required: true },
    policyExpiration: { type: Date, required: true },
    policyIssuer: { type: String, trim: true, required: true },
  },
  { _id: true }
);

const contractSchema = new Schema(
  {
    contractNumber: { type: String, trim: true, required: true },
    contractValue: { type: Number, required: true },
    contractDate: { type: String, required: true },
    contractExpiration: { type: String, required: true },
    policies: {
      type: [policySchema],
      default: [], 
    },
  },
  { _id: true }
);

const documentalSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    serviceOrderDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    certificateDate: { type: Date },
    contracts: {
      type: [contractSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Documental = model("Documental", documentalSchema);
