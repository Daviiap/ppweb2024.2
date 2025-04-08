import { Pool, QueryResult } from "pg";
import Project from "../../domain/Project";
import ProjectRepository from "../../domain/repositories/ProjectRepository";
import DatabaseError from "../errors/DatabaseError";
import ProjectNotFoundError from "../errors/ProjectNotFoundError";
import Member from "../../domain/Member";
import User from "../../domain/User";

export default class ProjectRepositorySQL implements ProjectRepository {
    constructor(private readonly pool: Pool) { }

    async save(project: Project, organizationId: string): Promise<void> {
        try {
            await this.pool.query(
                `INSERT INTO project (id, name, description, organization_id)
                VALUES ($1, $2, $3, $4)`,
                [project.getId(), project.getName(), project.getDescription(), organizationId]
            );
        } catch (error) {
            throw new DatabaseError(`Error saving project: ${error}`);
        }
    }

    async findById(id: string): Promise<Project> {
        let result: QueryResult;

        try {
            result = await this.pool.query(
                `SELECT
                    project.id AS project_id,
                    project.name AS project_name,
                    project.description AS project_description,
                    person.id AS person_id,
                    person.name AS person_name,
                    person.email AS person_email,
                    person_project.role AS project_role
                FROM
                    project
                    LEFT JOIN person_project ON project.id = person_project.project_id
                    LEFT JOIN person ON person_project.person_id = person.id
                WHERE
                    project.id = $1`,
                [id]
            );
        } catch (error) {
            throw new DatabaseError(`Error finding project by id: ${error}`);
        }

        if (!result.rowCount) {
            throw new ProjectNotFoundError(id);
        }

        return new Project(
            result.rows[0].project_id,
            result.rows[0].project_name,
            result.rows[0].project_description,
            result.rows.map(row => {
                return new Member(new User(row.person_id, row.person_name, row.person_email), row.project_role);
            })
        );
    }

    async findAllByOrganizationId(id: string): Promise<Project[]> {
        let result: QueryResult;

        try {
            result = await this.pool.query(
                `SELECT
                    project.id AS project_id,
                    project.name AS project_name,
                    project.description AS project_description,
                    person.id AS person_id,
                    person.name AS person_name,
                    person.email AS person_email,
                    person_project.role AS project_role
                FROM
                    project
                    LEFT JOIN person_project ON project.id = person_project.project_id
                    LEFT JOIN person ON person_project.person_id = person.id
                WHERE
                    project.organization_id = $1`,
                [id]
            );
        } catch (error) {
            throw new DatabaseError(`Error finding projects for organization: ${error}`);
        }

        const projects = result.rows.reduce<Map<string, Project>>((projectsMap, row) => {
            if (projectsMap.has(row.project_id)) {
                projectsMap.get(row.project_id)!.addMember(new User(row.person_id, row.person_name, row.person_email), row.project_role);
            } else {
                const newProject = new Project(
                    row.project_id,
                    row.project_name,
                    row.project_description
                );
                if (row.person_id) {
                    newProject.addMember(new User(row.person_id, row.person_name, row.person_email), row.project_role);
                }
                projectsMap.set(row.project_id, newProject);
            }

            return projectsMap;
        }, new Map<string, Project>());

        return Array.from(projects.values());
    }
}
