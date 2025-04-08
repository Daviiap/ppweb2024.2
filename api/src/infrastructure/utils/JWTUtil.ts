import jwt, { JwtPayload } from "jsonwebtoken";
import InvalidTokenError from "../errors/InvalidTokenError";

export default class JwtUtil {
  constructor(private readonly secretKey: string) { }

  generateToken(payload: object): string {
    return jwt.sign({ data: payload }, this.secretKey, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string): object | string {
    try {
      const decoded = jwt.verify(token, this.secretKey) as JwtPayload;
      return decoded.data;
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
}
