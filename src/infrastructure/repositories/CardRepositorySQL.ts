import { Pool, QueryResult } from "pg";
import Card from "../../domain/Card";
import CardRepository from "../../domain/repositories/CardRepository";
import DatabaseError from "../errors/DatabaseError";
import CardDatabaseRow from "../dtos/CardDatabaseRow";
import CardNotFoundError from "../errors/CardNotFoundError";

export default class CardRepositorySQL implements CardRepository {
    constructor(private readonly pool: Pool) { }

    async save(card: Card, organizationId: string): Promise<void> {
        try {
            await this.pool.query(
                `
                INSERT INTO card (id, name, image_url, organization_id, visibility)
                VALUES ($1, $2, $3, $4, $5)`,
                [card.getId(), card.getName(), card.getImage(), organizationId, card.getVisibility()]
            );
        } catch (error) {
            throw new DatabaseError(`Error saving card: ${error}`);
        }
    }

    async findById(id: string): Promise<Card> {
        let result: QueryResult<CardDatabaseRow>;

        try {
            result = await this.pool.query<CardDatabaseRow>(
                `SELECT * FROM card WHERE id = $1`,
                [id]
            );
        } catch (error) {
            throw new DatabaseError(`Error finding card by id: ${error}`);
        }

        if (!result.rowCount) {
            throw new CardNotFoundError(id);
        }

        return new Card(
            result.rows[0].id,
            result.rows[0].name,
            result.rows[0].image_url,
            result.rows[0].organization_id,
            result.rows[0].visibility as 'public' | 'private'
        );
    }

    async findAllByOrganizationId(organizationId: string): Promise<Card[]> {
        let result: QueryResult<CardDatabaseRow>;

        try {
            result = await this.pool.query<CardDatabaseRow>(
                `SELECT * FROM card WHERE organization_id = $1`,
                [organizationId]
            );
        } catch (error) {
            throw new DatabaseError(`Error finding cards for company: ${error}`);
        }

        return result.rows.map((row) => new Card(
            row.id,
            row.name,
            row.image_url,
            row.organization_id,
            row.visibility as 'public' | 'private'
        ));
    }
}
