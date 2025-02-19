import { isEmpty } from "class-validator";
import ValidationError from "./errors/ValidationError";

export default class User {
  public static create(name: string, email: string, password?: string): User {
    const id = crypto.randomUUID();
    return new User(id, name, email, password);
  }

  private email: string;
  private readonly id: string;
  private name: string;
  private password?: string;

  public constructor(
    id: string,
    name: string,
    email: string,
    password?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;

    this.validate();
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getPassword(): string | undefined {
    return this.password;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  private validate(): void {
    if (isEmpty(this.id) || isEmpty(this.name) || isEmpty(this.email)) {
      throw new ValidationError([
        { field: "id", message: "is required" },
        { field: "name", message: "is required" },
        { field: "email", message: "is required" },
      ]);
    }
  }
}
