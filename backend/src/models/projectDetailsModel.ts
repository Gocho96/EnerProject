import { Schema, model, Types } from "mongoose";

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
        "Cédula de ciudadanía",
        "NIT",
        "Cédula de extranjería",
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

    contactPerson: [
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
          type: Number,
        },

        contactEmail: {
          type: String,
          trim: true,
          match: /.+\@.+\..+/,
        },
      },
    ],

    solarPanels: [
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
    ],

    inverters: [
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
    ],

    batteries: [
      {
        numberBattery: {
          type: Number,
        },

        batteryAmperage: {
          type: Number,
        },

        batteryVoltage: {
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
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProjectDetails = model("ProjectDetails", projectDetailsSchema);
