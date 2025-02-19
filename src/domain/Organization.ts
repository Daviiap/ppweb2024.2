import { isEmpty } from "class-validator";
import Card from "./Card";
import Project from "./Project";
import User from "./User";
import ValidationError from "./errors/ValidationError";

export default class Organization {
    private readonly id: string;
    private name: string;
    private description: string;
    private owner: User;
    private cards: Card[] = [];
    private members: User[] = [];
    private projects: Project[];

    constructor(id: string, name: string, owner: User, description: string = "", projects: Project[] = [], cards: Card[] = []) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.projects = projects;
        this.cards = cards;
        this.description = description;

        this.validate();
    }

    public create(name: string, owner: User, description: string = "", projects: Project[] = [], cards: Card[] = []): Organization {
        const id = crypto.randomUUID();
        return new Organization(id, name, owner, description, projects, cards);
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

    public getOwner(): User {
        return this.owner;
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public getMembers(): User[] {
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

    public addMember(member: User): void {
        this.members.push(member);
    }

    public addProject(project: Project): void {
        this.projects.push(project);
    }

    private validate() {
        if (isEmpty(this.id) || isEmpty(this.name) || isEmpty(this.owner)) {
            throw new ValidationError([
                { field: "id", message: "is required" },
                { field: "name", message: "is required" },
                { field: "owner", message: "is required" },
            ]);
        }
    }
}
