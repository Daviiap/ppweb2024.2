import { Pool } from "pg";
import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/User";
import DatabaseError from "../errors/DatabaseError";

export default class UserRepositorySQL implements UserRepository {
  constructor(private readonly pool: Pool) {}
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
      await this.pool.query(`
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
