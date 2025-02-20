import { isEmpty } from "class-validator";
import Card from "./Card";
import Project from "./Project";
import User from "./User";
import ValidationError from "./errors/ValidationError";
import Member from "./Member";

export enum OrganizationRoles {
    OWNER = "OWNER",
    MANAGER = "MANAGER",
    MEMBER = "MEMBER",
}

export default class Organization {
    private readonly id: string;
    private name: string;
    private description: string;
    private cards: Card[] = [];
    private members: Member[] = [];
    private projects: Project[];

    constructor(id: string, name: string, members: Member[], description: string = "", projects: Project[] = [], cards: Card[] = []) {
        this.id = id;
        this.name = name;
        this.projects = projects;
        this.cards = cards;
        this.description = description;
        this.members = members;

        this.validate();
    }

    public static create(name: string, members: Member[], description: string = "", projects: Project[] = [], cards: Card[] = []): Organization {
        const id = crypto.randomUUID();
        return new Organization(id, name, members, description, projects, cards);
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

    public getCards(): Card[] {
        return this.cards;
    }

    public getOwner(): User {
        return this.members.find((member) => member.getRole() === "owner")!.getUser()!;
    }

    public getMembers(): Member[] {
        return this.members;
    }

    public getProjects(): Project[] {
        return this.projects;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public addCard(card: Card): void {
        this.cards.push(card);
    }

    public addMember(user: User, role: OrganizationRoles): void {
        this.members.push(new Member(user, role));
    }

    public addProject(project: Project): void {
        this.projects.push(project);
    }

    private validate() {
        if (isEmpty(this.id) || isEmpty(this.name)) {
            throw new ValidationError([
                { field: "id", message: "is required" },
                { field: "name", message: "is required" },
                { field: "owner", message: "is required" },
            ]);
        }

        if (this.members.length === 0) {
            throw new ValidationError([
                { field: "members", message: "is required" },
            ]);
        }

        if (!this.members.find((member) => member.getRole() === "owner")) {
            throw new ValidationError([
                { field: "members", message: "owner is required" },
            ]);
        }
    }
}
