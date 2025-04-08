import { isEmpty } from "class-validator";
import User from "./User";
import ValidationError from "./errors/ValidationError";

export default class Member {
    private user: User;
    private role: string;

    constructor(user: User, role: string) {
        this.user = user;
        this.role = role;
        this.validate();
    }

    public getUser(): User {
        return this.user;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
        this.validate();
    }

    private validate(): void {
        if (isEmpty(this.user) || isEmpty(this.role)) {
            throw new ValidationError([
                { field: "user", message: "is required" },
                { field: "role", message: "is required" },
            ]);
        }
    }
}
