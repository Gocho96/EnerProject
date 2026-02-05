import { Schema, model, Types } from "mongoose";

const contactPersonSchema = new Schema(
  {
    contactName: {
      type: String,
      trim: true,
    },
    contactPosition: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      match: /.+\@.+\..+/,
    },
  },
  { _id: true },
);

const solarPanelSchema = new Schema(
  {
    numberPanels: {
      type: Number,
    },
    panelPower: {
      type: Number,
    },
    panelBrand: {
      type: String,
      trim: true,
    },
    panelReference: {
      type: String,
      trim: true,
    },
  },
  { _id: true },
);

const inverterSchema = new Schema(
  {
    numberInverter: {
      type: Number,
    },
    inverterPower: {
      type: Number,
    },
    inverterBrand: {
      type: String,
      trim: true,
    },
    inverterReference: {
      type: String,
      trim: true,
    },
  },
  { _id: true },
);

const batterySchema = new Schema(
  {
    numberBatteries: {
      type: Number,
    },
    batteryAmperage: {
      type: Number,
    },
    batteryVoltage: {
      type: Number,
    },
    batteryPower: {
      type: Number,
    },
    batteryBrand: {
      type: String,
      trim: true,
    },
    batteryReference: {
      type: String,
      trim: true,
    },
  },
  { _id: true },
);

const projectDetailsSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    projectOwner: {
      type: String,
      trim: true,
    },
    typeDocument: {
      type: String,
      enum: [
        "CC",
        "CE",
        "NIT",
        "PPT",
        "Pasaporte",
        "Otro",
      ],
      trim: true,
    },
    documentNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    dcPower: {
      type: Number,
    },
    acPower: {
      type: Number,
    },
    contactPerson: {
      type: [contactPersonSchema],
      default: [],
    },
    solarPanels: {
      type: [solarPanelSchema],
      default: [],
    },
    inverters: {
      type: [inverterSchema],
      default: [],
    },
    batteries: {
      type: [batterySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProjectDetails = model("ProjectDetails", projectDetailsSchema);
