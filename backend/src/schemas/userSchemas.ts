import { z, ZodSchema } from "zod";

export const registerSchema: ZodSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email es invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const loginSchema: ZodSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "El email es invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});