import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export const authRequired = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ message: "No hay token" });
    return;
  }
  jwt.verify(
    token,
    TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (err || !user) {
        res.status(401).json({ message: "Token inválido" });
        return;
      }
      req.user = user;
      next();
    }
  );
};
