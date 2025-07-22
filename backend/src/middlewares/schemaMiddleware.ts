import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.errors.map((e) => e.message),
        });
        return;
      }
      res.status(500).json({ error: ["Error desconocido en validación"] });
      return;
    }
  };
