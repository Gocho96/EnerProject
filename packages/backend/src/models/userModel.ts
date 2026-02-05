import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      trim: true,
      minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      trim: true,
      unique: true,
      match: [/.+@.+\..+/, "Debe ser un correo válido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "usuario"],
      default: "usuario",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
