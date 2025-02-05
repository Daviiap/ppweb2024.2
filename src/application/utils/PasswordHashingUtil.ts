import * as argon2 from "argon2";

export default class PassworHashingdUtil {
  static async hash(password: string): Promise<string> {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }

  static async verify(
    hash: string,
    password: string
  ): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      throw new Error("Error verifying password");
    }
  }
}
