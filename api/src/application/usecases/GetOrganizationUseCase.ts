import Organization from "../../domain/Organization";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import NotOrganizationOwnerError from "../errors/NotOrganizationOwnerError";
import UseCase from "./UseCase";

export default class GetOrganizationUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    public async execute(input: Input): Promise<Output> {
        const organization = await this.organizationRepository.findById(input.id);
        
        let isMember = false;
        organization.getMembers().forEach(member => {
            if (member.getUser().getId() === input.owner.id) {
                isMember = true;
            }
        });

        if (!isMember) {
           throw new NotOrganizationOwnerError(input.id);
        }

        return organization;
    }
}

type Input = {
    id: string;
    owner: {
        id: string;
        name: string;
        email: string;
    };
};

type Output = Organization;
