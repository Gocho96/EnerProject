import { Schema, model, Types } from "mongoose";

const phaseSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    
    projectId: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },

    phaseDocumental: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseEngineering: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseShopping: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseInstallation: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseTaxIncentive: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseRetie: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseNetworkOperator: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseMarketing: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseMaintenance: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },

    phaseBilling: {
      status: {
        type: String,
        enum: ["En progreso", "Pausado", "Completado", "N/A"],
        default: "En progreso",
        required: true,
      },

      workProgress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        required: true,
      },

      news: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Phase = model("Phase", phaseSchema);
