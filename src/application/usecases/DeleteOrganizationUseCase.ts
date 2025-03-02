import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import NotOrganizationOwnerError from "../errors/NotOrganizationOwnerError";
import UseCase from "./UseCase";

export default class DeleteOrganizationUseCase implements UseCase<Input, void> {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    public async execute(input: Input): Promise<void> {
        const organization = await this.organizationRepository.findById(input.id);

        let isOwner = false;
        organization.getMembers().forEach(member => {
            if (member.getUser().getId() === input.owner.id && member.getRole() === 'OWNER') {
                isOwner = true;
            }
        });

        if (!isOwner) {
            throw new NotOrganizationOwnerError(input.id);
        }

        await this.organizationRepository.delete(input.id);
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
