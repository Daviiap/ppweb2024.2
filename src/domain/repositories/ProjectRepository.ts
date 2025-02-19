import Project from "../Project";

export default interface ProjectRepository {
    save(project: Project): Promise<Project>;
    findById(id: string): Promise<Project>;
    findAllByOrganizationId(id: string): Promise<Project[]>;
}