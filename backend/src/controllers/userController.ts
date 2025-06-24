import { RequestHandler, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../utils/jwt";
import { User } from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | { id: string };
}

/*export const register: RequestHandler = async (req, res) => {
  const { username, email, password, role} = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      res.status(400).json(["El correo ya está registrado"]);
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id.toString() });

    res.cookie("token", token, { httpOnly: true });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};*/

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      res.status(400).json({ message: "El usuario no está registrado" });
      return;
    }

    if (!userFound.password) {
      res.status(500).json({ message: "Error en la contraseña" });
      return;
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      res.status(400).json({ message: "Contraseña invalida" });
      return;
    }

    const token = await createAccessToken({ id: userFound._id.toString() });
    res.cookie("token", token, { httpOnly: true });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAd: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Ocurrió un error" });
    }
    return;
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.sendStatus(200);
    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const verifyToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      res.status(400).json({ message: "El usuario no existe" });
      return;
    }
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const profile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }
    const userFound = await User.findById(req.user.id);
    if (!userFound) {
      res.status(400).json({ message: "El usuario no existe" });
      return;
    }
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound. role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
