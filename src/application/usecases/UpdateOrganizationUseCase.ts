import Member from "../../domain/Member";
import Organization from "../../domain/Organization";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import User from "../../domain/User";
import NotOrganizationOwnerError from "../errors/NotOrganizationOwnerError";
import UseCase from "./UseCase";

export default class UpdateOrganizationUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    public async execute(input: Input): Promise<Output> {
        const organization = await this.organizationRepository.findById(input.id);
        
        let isOwner = false;
        organization.getMembers().forEach(member => {
            if (member.getUser().getId() === input.owner.id && member.getRole() === 'owner') {
                isOwner = true;
            }
        });

        if (!isOwner) {
           throw new NotOrganizationOwnerError(input.id);
        }

        organization.setName(input.name);
        organization.setDescription(input.description);

        await this.organizationRepository.save(organization);
        
        return organization;
    }
}

type Input = {
    id: string;
    name: string;
    description: string;
    owner: {
        id: string;
        name: string;
        email: string;
    };
};

type Output = Organization;
