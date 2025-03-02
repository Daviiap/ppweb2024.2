import { isEmpty } from "class-validator";
import ValidationError from "./errors/ValidationError";
import User from "./User";
import Member from "./Member";

export enum ProjectRoles {
    MANAGER = "MANAGER",
    MEMBER = "MEMBER",
}

export default class Project {
    private readonly id: string;
    private name: string;
    private description: string;
    private readonly members: Member[] = [];

    public static create(name: string, description: string = "", members: Member[] = []): Project {
        const id = crypto.randomUUID();
        return new Project(id, name, description, members);
    }
    
    public constructor(id: string, name: string, description: string = "", members: Member[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.members = members;

        this.validate();
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

    public getMembers(): Member[] {
        return this.members;
    }

    public setName(name: string): void {
        this.name = name;
        this.validate();
    }

    public setDescription(description: string): void {
        this.description = description;
        this.validate();
    }

    public addMember(user: User, role: string): void {
        this.members.push(new Member(user, role));
        this.validate();
    }

    private validate() {
        const errors = [];

        if (isEmpty(this.id)) {
            errors.push({ field: "id", message: "is required" });
        }

        if (isEmpty(this.name)) {
            errors.push({ field: "name", message: "is required" });
        }

        if (errors.length > 0) {
            throw new ValidationError(errors);
        }

        this.members.forEach(member => {
            if (!Object.values(ProjectRoles).includes(member.getRole() as ProjectRoles)) {
                throw new ValidationError([
                    { field: "members", message: `invalid role for member: ${member.getRole()}` },
                ]);
            }
        });
    }
}
