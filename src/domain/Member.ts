import User from "./User";

export default class Member {
    private user: User;
    private role: string;

    constructor(user: User, role: string) {
        this.user = user;
        this.role = role;
    }

    public getUser(): User {
        return this.user;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }
}
