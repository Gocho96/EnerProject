import { Schema, model, Types } from "mongoose";

const beneficiariesSchema = new Schema(
  {
    typeBeneficiary: {
      type: String,
      trim: true,
      enum: ["Principal", "Secundario"],
    },
    nameBeneficiary: {
      type: String,
      trim: true,
    },
    numberDocumentBeneficiary: {
      type: String,
      trim: true,
    },
    roleBeneficiary: {
      type: String,
      trim: true,
      enum: [
        "Dueño del proyecto",
        "Entidad Bancaria",
        "Instalador",
        "Importador",
        "Consultor",
        "Proveedor",
      ],
    },
  },
  { _id: true },
);

const paymentsSchema = new Schema(
  {
    paymentDate: {
      type: Date,
    },
    paymentNumber: {
      type: String,
      trim: true,
    },
    paymentValue: {
      type: Number,
    },
  },
  { _id: true },
);

const applicationItSchema = new Schema(
  {
    applicationNumberIt: {
      type: String,
      trim: true,
    },
    applicacionDateIt: {
      type: Date,
    },
    investmentValueIt: {
      type: Number,
    },
    evaluationDateIt: {
      type: Date,
    },
    certificateNumberIt: {
      type: String,
      trim: true,
    },
    certificateDateIt: {
      type: Date,
    },
    beneficiaries: {
      type: [beneficiariesSchema],
      default: [],
    },
    payments: {
      type: [paymentsSchema],
      default: [],
    },
  },
  { _id: true },
)

const taxIncentiveSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    applicationIt: {
      type: [applicationItSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TaxIncentive = model("TaxIncentive", taxIncentiveSchema);
