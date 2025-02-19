import Organization from "../Organization";

export default interface OrganizationRepository {
    save(organization: Organization): Promise<Organization>;
    findById(id: string): Promise<Organization>;
}
