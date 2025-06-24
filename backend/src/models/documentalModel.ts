import { Schema, model, Types } from "mongoose";

const documentalSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    serviceOrderDate: {
      type: Date,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    certificateDate: {
      type: Date,
    },

    contracts: [
      {
        contractNumber: { type: String, trim: true },
        contractDate: { type: Date},
        contractValue: { type: Number},
        contractExpiration: { type: Date},

        policies: [
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
            },
            policyNumber: { type: String},
            policyValue: { type: Number},
            policyDate: { type: Date},
            policyExpiration: { type: Date},
            policyIssuer: { type: String, trim: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Documental = model("Documental", documentalSchema);
