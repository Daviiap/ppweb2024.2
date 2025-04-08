import * as argon2 from "argon2";
import HashingError from "../errors/HashingError";
import PasswordVerifyError from "../errors/PasswordVerifyError";

export default class PassworHashingdUtil {
  static async hash(password: string): Promise<string> {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (error) {
      throw new HashingError(error);
    }
  }

  static async verify(
    hash: string,
    password: string
  ): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      throw new PasswordVerifyError(error);
    }
  }
}
