import { Schema, model, Types } from "mongoose";

const retieSchema = new Schema(
  {
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    
    applicationDateRetie: {
      type: Date,
    },

    commercialOfferNumberRetie: {
      type: Number,
    },

    supplierRetie: {
      type: String,
      trim: true,
    },

    paymentDateRetie: {
      type: Date,
    },

    inspectionDateRetie: {
      type: Date,
    },

    dictamenDateRetie: {
      type: Date,
      validate: {
        validator: function (this: any, value: Date) {
          if (value && !this.inspectionDateRetie) {
            return false;
          }
          return true;
        },
        message:
          "No se puede registrar un dictamen sin haber realizado la inspección previa.",
      },
    },

    dictamenNumberRetie: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Retie = model("Retie", retieSchema);
