import Member from "../../domain/Member";
import Organization from "../../domain/Organization";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import User from "../../domain/User";
import UseCase from "./UseCase";

export default class CreateOrganizationUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    public async execute(input: Input): Promise<Output> {
        const organization = Organization.create(input.name, [new Member(new User(input.owner.id, input.owner.name, input.owner.email), 'OWNER')], input.description);
        
        await this.organizationRepository.save(organization);

        return organization;
    }
}

type Input = {
    owner: {
        id: string;
        name: string;
        email: string;
    };
    name: string;
    description: string;
};

type Output = Organization;
