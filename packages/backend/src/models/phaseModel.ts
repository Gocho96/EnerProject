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
    Documental: {
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
    Engineering: {
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
    Shopping: {
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

    Installation: {
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

    TaxIncentive: {
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

    Retie: {
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

    NetworkOperator: {
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

    Marketing: {
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

    Maintenance: {
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

    Billing: {
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
