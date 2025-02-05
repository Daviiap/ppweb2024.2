import jwt from "jsonwebtoken";
import InvalidTokenError from "../errors/InvalidTokenError";

export default class JwtUtil {
  constructor(private readonly secretKey: string) {}

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string): object | string {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
}
