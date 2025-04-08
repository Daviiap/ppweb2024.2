import OutputDTO from "./OutputDTO";

export default class CreateOrganizationOutputDTO implements OutputDTO {
    id: string;
    name: string;
    description: string;
}