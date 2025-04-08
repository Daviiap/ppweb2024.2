import { IsNotEmpty, IsString } from "class-validator";
import { Type } from 'class-transformer';
import InputDTO from "./InputDTO"

export default class ListOrganizationsInputDTO extends InputDTO {
    @Type(() => OwnerInputDTO)
    @IsNotEmpty()
    user: OwnerInputDTO;
}

export class OwnerInputDTO {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;
}
