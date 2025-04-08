import Organization from "../../domain/Organization";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import NotOrganizationOwnerError from "../errors/NotOrganizationOwnerError";
import UseCase from "./UseCase";

export default class ListOrganizationsUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    public async execute(input: Input): Promise<Output> {
        const organizations = await this.organizationRepository.findManyByUserId(input.user.id);
        
        return organizations;
    }
}

type Input = {
    user: {
        id: string;
        name: string;
        email: string;
    };
};

type Output = Organization[];
