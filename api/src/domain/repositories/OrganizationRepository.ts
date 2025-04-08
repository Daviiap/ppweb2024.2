import Organization from "../Organization";

export default interface OrganizationRepository {
    save(organization: Organization): Promise<void>;
    findById(id: string): Promise<Organization>;
    findManyByUserId(userId: string): Promise<Organization[]>;
    delete(id: string): Promise<void>;
}
