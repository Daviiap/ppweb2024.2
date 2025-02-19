import { Pool, QueryResult } from "pg";
import Organization from "../../domain/Organization";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import DatabaseError from "../errors/DatabaseError";
import OrganizationNotFoundError from "../errors/OrganizationNotFoundError";
import Member from "../../domain/Member";
import User from "../../domain/User";

export default class OrganizationRepositorySQL implements OrganizationRepository {
    constructor(private readonly pool: Pool) { }

    async save(organization: Organization): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            await client.query(
                `
                INSERT INTO organization (id, name, description)
                VALUES ($1, $2, $3)`,
                [organization.getId(), organization.getName(), organization.getDescription()]
            );

            let query = `INSERT INTO person_organization (person_id, organization_id, role) VALUES `;

            const members = organization.getMembers();
            members.forEach((member, index) => {
                query += `(${member.getUser().getId()}, ${organization.getId()}, ${member.getRole()})`;
                if (index < members.length - 1) {
                    query += ',';
                }
            });

            query += ` ON CONFLICT (person_id, organization_id) DO UPDATE SET role = EXCLUDED.role`;

            await client.query(query);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw new DatabaseError(`Error saving organization: ${error}`);
        } finally {
            client.release();
        }
    }

    async findById(id: string): Promise<Organization> {
        let result: QueryResult;

        try {
            result = await this.pool.query(`
                SELECT
                    organization.id AS organization_id,
                    organization.name AS organization_name,
                    organization.description AS organization_description,
                    person.id AS person_id,
                    person.name AS person_name,
                    person.email AS person_email,
                    person_organization.role AS person_role
                FROM
                    organization
                    LEFT JOIN person_organization ON organization.id = person_organization.organization_id
                    LEFT JOIN person ON person_organization.person_id = person.id
                WHERE
                    organization.id = $1`,
                [id]
            );
        } catch (error) {
            throw new DatabaseError(`Error finding organization by id: ${error}`);
        }

        if (!result.rowCount) {
            throw new OrganizationNotFoundError(`Organization with id "${id}" not found`);
        }

        return new Organization(
            result.rows[0].organization_id,
            result.rows[0].organization_name,
            result.rows.map(row => {
                return new Member(new User(row.person_id, row.person_name, row.person_email), row.person_role);
            }),
            result.rows[0].organization_description
        );
    }
}
