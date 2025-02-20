import { isEmpty } from "class-validator";
import ValidationError from "./errors/ValidationError";
import Organization from "./Organization";

export default class Card {
    private readonly id: string;
    private image: string;
    private visibility: 'public' | 'private';
    private name: string;
    private owner: Organization | string;

    constructor(id: string, image: string, name: string, owner: Organization | string, visibility: 'public' | 'private') {
        this.id = id;
        this.name = name;
        this.image = image;
        this.owner = owner;
        this.visibility = visibility;

        this.validate();
    }

    public static create(image: string, name: string, owner: Organization | string, visibility: 'public' | 'private'): Card {
        const id = crypto.randomUUID();
        return new Card(id, image, name, owner, visibility);
    }

    public getId(): string {
        return this.id;
    }

    public getImage(): string {
        return this.image;
    }

    public getName(): string {
        return this.name;
    }

    public getOwner(): Organization | string {
        return this.owner;
    }

    public getVisibility(): 'public' | 'private' {
        return this.visibility;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setVisibility(visibility: 'public' | 'private'): void {
        this.visibility = visibility;
    }

    private validate(): void {
        if (isEmpty(this.id) || isEmpty(this.name) || isEmpty(this.image) || isEmpty(this.owner)) {
            throw new ValidationError([
                { field: "id", message: "is required" },
                { field: "name", message: "is required" },
                { field: "image", message: "is required" },
                { field: "owner", message: "is required" },
            ]);
        }
    }
}
