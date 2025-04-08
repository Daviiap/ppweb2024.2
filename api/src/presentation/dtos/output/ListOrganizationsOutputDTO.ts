import OutputDTO from "./OutputDTO";

export default class ListOrganizationsOutputDTO implements OutputDTO {
    organizations: {
        id: string;
        name: string;
        description: string;
        members: any[];
    }[];
}