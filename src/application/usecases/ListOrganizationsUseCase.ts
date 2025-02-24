import Organization from "../../domain/Organization";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import NotOrganizationOwnerError from "../errors/NotOrganizationOwnerError";
import UseCase from "./UseCase";

export default class ListOrganizationsUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    public async execute(input: Input): Promise<Output> {
        const organization = await this.organizationRepository.findById("0c7ef55d-72d5-46ea-a463-e4696c7fb572");
        
        return [organization];
    }
}

type Input = {
    owner: {
        id: string;
        name: string;
        email: string;
    };
};

type Output = Organization[];
