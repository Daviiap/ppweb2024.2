import { Pool } from "pg";
import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/User";
import DatabaseError from "../errors/DatabaseError";
import UserNotFoundError from "../errors/UserNotFoundError";

export default class UserRepositorySQL implements UserRepository {
  constructor(private readonly pool: Pool) {}
  async findByEmail(email: string): Promise<User> {
    try {
      const result = await this.pool.query(
        `SELECT * FROM person WHERE email = $1`,
        [email]
      );

      return new User(
        result.rows[0].id,
        result.rows[0].name,
        result.rows[0].email,
        result.rows[0].password
      );
    } catch (error) {
      throw new UserNotFoundError(email);
    }
  }

  public async exists(email: string): Promise<boolean> {
    try {
      const result = await this.pool.query(
        `SELECT EXISTS(SELECT 1 FROM person WHERE email = $1)`,
        [email]
      );
      return result.rows[0].exists;
    } catch (error) {
      throw new DatabaseError(`Error checking if user exists: ${error}`);
    }
  }

  public async createUser(user: User): Promise<User> {
    try {
      await this.pool.query(
        `
        INSERT INTO person (id, email, name, password) 
        VALUES ($1, $2, $3, $4)`,
        [user.getId(), user.getEmail(), user.getName(), user.getPassword()]
      );

      return user;
    } catch (error) {
      throw new DatabaseError(`Error creating user: ${error}`);
    }
  }
}
