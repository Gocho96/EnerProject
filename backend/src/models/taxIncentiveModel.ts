import { Schema, model, Types } from "mongoose";

const taxIncentiveSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    filingNumberIt: {
      type: String,
      trim: true,
    },

    dateFilingIt: {
      type: Date,
    },

    investmentValueIt: {
      type: Number,
    },

    paymentValueIt: {
      type: Number,
    },

    paymentDateIt: {
      type: Date,
    },

    paymentNumberIt: {
      type: String,
      trim: true,
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

    secondaryBeneficiaries: [
      {
        name: {
          type: String,
          trim: true,
        },
        numberDocument: {
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

export const TaxIncentive = model("TaxIncentive", taxIncentiveSchema);
