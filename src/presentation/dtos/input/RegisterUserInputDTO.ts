import { IsNotEmpty, IsString } from "class-validator";
import InputDTO from "./InputDTO"

export default class RegisterUserInputDTO extends InputDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
