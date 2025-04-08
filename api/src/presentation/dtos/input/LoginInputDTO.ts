import { IsNotEmpty, IsString } from "class-validator";
import InputDTO from "./InputDTO"

export default class LoginInputDTO extends InputDTO {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
