import { isEmpty } from "class-validator";
import ValidationError from "./errors/ValidationError";
import User from "./User";

export default class Project {
    readonly id: string;
    private name: string;
    private description: string;
    private members: User[] = [];

    constructor(id: string, name: string, description: string = "", members: User[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.members = members;

        this.validate();
    }

    public create(name: string, description: string = "", members: User[] = []): Project {
        const id = crypto.randomUUID();
        return new Project(id, name, description, members);
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getMembers(): User[] {
        return this.members;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public addMember(member: User): void {
        this.members.push(member);
    }

    private validate() {
        if (isEmpty(this.id) || isEmpty(this.name)) {
            throw new ValidationError([
                { field: "id", message: "is required" },
                { field: "name", message: "is required" },
                { field: "description", message: "is required" },
            ]);
        }
    }
}
