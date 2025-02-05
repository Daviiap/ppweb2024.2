import OutputDTO from "./OutputDTO";

export default class LoginOutputDTO implements OutputDTO {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}