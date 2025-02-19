import Card from "../Card";

export default interface CardRepository {
    save(card: Card): Promise<Card>;
    findById(id: string): Promise<Card>;
    findAllByOrganizationId(id: string): Promise<Card[]>;
}