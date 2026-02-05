import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config";

interface Payload {
  id: string;
  email?: string;
}

export function createAccessToken(payload: Payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}
