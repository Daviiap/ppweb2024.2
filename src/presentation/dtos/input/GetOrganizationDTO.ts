import { IsNotEmpty, IsString } from "class-validator";
import { Type } from 'class-transformer';
import InputDTO from "./InputDTO"

export default class GetOrganizationInputDTO extends InputDTO {
    @Type(() => OwnerInputDTO)
    @IsNotEmpty()
    owner: OwnerInputDTO;

    @IsString()
    @IsNotEmpty()
    id: string;
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
