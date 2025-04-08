import Card from "../Card";

export default interface CardRepository {
    save(card: Card, organizationId: string): Promise<void>;
    findById(id: string): Promise<Card>;
    findAllByOrganizationId(id: string): Promise<Card[]>;
}