import { Pool, QueryResult } from "pg";
import Organization from "../../domain/Organization";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import DatabaseError from "../errors/DatabaseError";
import OrganizationNotFoundError from "../errors/OrganizationNotFoundError";
import Member from "../../domain/Member";
import User from "../../domain/User";
import Project from "../../domain/Project";
import Card from "../../domain/Card";

export default class OrganizationRepositorySQL implements OrganizationRepository {
    constructor(private readonly pool: Pool) { }
    async delete(id: string): Promise<void> {
        try {
            await this.pool.query(`UPDATE organization SET deleted = TRUE WHERE id = $1`, [id]);
        } catch (error) {
            throw new DatabaseError(`Error deleting organization: ${error}`);
        }
    }

    async findManyByUserId(userId: string): Promise<Organization[]> {
        let result: QueryResult;
        let members: Member[];
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
                    person_organization
                    LEFT JOIN organization ON person_organization.organization_id = organization.id
                    LEFT JOIN person ON person_organization.person_id = person.id
                WHERE
                    person_organization.person_id = $1 AND deleted = FALSE`,
                [userId]
            );

            if (result.rowCount) {
                const membersResult = await this.pool.query(`
                    SELECT
                        person.id AS person_id,
                        person.name AS person_name,
                        person.email AS person_email,
                        person_organization.role AS person_role
                    FROM
                        person_organization
                        JOIN person ON person_organization.person_id = person.id
                    WHERE
                        person_organization.organization_id = $1
                `, [result.rows[0].organization_id]);

                members = membersResult.rows.map(row =>
                    new Member(
                        new User(row.person_id, row.person_name, row.person_email),
                        row.person_role
                    )
                );
            }
        } catch (error) {
            throw new DatabaseError(`Error finding organization by id: ${error}`);
        }

        return result.rows.map(row => {
            return new Organization(
                row.organization_id,
                row.organization_name,
                members,
                row.organization_description
            )
        });
    }

    async save(organization: Organization): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            await client.query(
                `
                INSERT INTO organization (id, name, description)
                VALUES ($1, $2, $3)
                ON CONFLICT (id) DO
                UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description`,
                [organization.getId(), organization.getName(), organization.getDescription()]
            );

            let query = `INSERT INTO person_organization (person_id, organization_id, role) VALUES `;

            const members = organization.getMembers();
            members.forEach((member, index) => {
                query += `('${member.getUser().getId()}', '${organization.getId()}', '${member.getRole()}')`;
                if (index < members.length - 1) {
                    query += ',';
                }
            });

            query += ` ON CONFLICT (person_id, organization_id) DO UPDATE SET role = EXCLUDED.role`;

            console.log(query);

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
        try {
            const orgResult = await this.pool.query(`
                SELECT id, name, description
                FROM organization
                WHERE id = $1 AND deleted = FALSE
            `, [id]);

            if (!orgResult.rowCount) {
                throw new OrganizationNotFoundError(`Organization with id "${id}" not found`);
            }

            const orgRow = orgResult.rows[0];

            const membersResult = await this.pool.query(`
                SELECT
                    person.id AS person_id,
                    person.name AS person_name,
                    person.email AS person_email,
                    person_organization.role AS person_role
                FROM
                    person_organization
                    JOIN person ON person_organization.person_id = person.id
                WHERE
                    person_organization.organization_id = $1
            `, [id]);

            const members = membersResult.rows.map(row =>
                new Member(
                    new User(row.person_id, row.person_name, row.person_email),
                    row.person_role
                )
            );

            const projectsResult = await this.pool.query(`
                SELECT id, name, description
                FROM project
                WHERE organization_id = $1
            `, [id]);

            const projects = projectsResult.rows.map(row =>
                new Project(row.id, row.name, row.description)
            );

            const cardsResult = await this.pool.query(`
                SELECT id, name, image_url, visibility
                FROM card
                WHERE organization_id = $1
            `, [id]);

            const cards = cardsResult.rows.map(row =>
                new Card(row.id, row.image_url, row.name, id, row.visibility)
            );

            return new Organization(
                orgRow.id,
                orgRow.name,
                members,
                orgRow.description,
                projects,
                cards
            );

        } catch (error) {
            throw new DatabaseError(`Error finding organization by id: ${error}`);
        }
    }

}
