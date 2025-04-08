import Project from "../Project";

export default interface ProjectRepository {
    save(project: Project,organizationId: string): Promise<void>;
    findById(id: string): Promise<Project>;
    findAllByOrganizationId(id: string): Promise<Project[]>;
}