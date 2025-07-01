import { Schema, model, Types } from "mongoose";

const maintenanceSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    maintenanceFrequency: {
      type: Number,
      required: true,
      min: 1,
    },

    nextMaintenance: {
      type: Date,
    },

    maintenance: [
      {
        maintenanceNumber: {
          type: Number,
          required: true,
        },

        maintenanceDate: {
          type: Date,
        },

        typeMaintenance: {
          type: String,
          trim: true,
          enum: ["Preventivo", "Correctivo"],
        },

        maintenanceReportDate: {
          type: Date,
        },

        maintenanceInvoiceDate: {
          type: Date,
        },

        maintenanceNotes: {
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

export const Maintenance = model("Maintenance", maintenanceSchema);
