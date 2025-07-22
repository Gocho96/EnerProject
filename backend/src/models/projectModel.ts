import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
    name: {
      type: String,
      required: true,
      trim: true,
    },

    typeOfService: {
      type: String,
      enum: [
        "Diseño, suministro e instalación SSFV",
        "Incentivos tributarios",
        "Análisis de calidad de la energía",
        "Consultoria técnica",
        "Mantenimiento",
        "Normalización",
        "Diseño / ingeniería",
        "Instalación / mano de obra",
        "Suministro de materiales / equipos",
        "Otro servicio",
      ],
      required: true,
      trim: true,
    },

    state: {
      type: String,
      enum: ["Por iniciar", "En curso", "Pausado", "Finalizado", "Cancelado"],
      required: true,
    },

    startContract: {
      type: Date,
    },

    endContract: {
      type: Date,
    },

    nextMaintenance: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Project = model("Project", projectSchema);
