import OutputDTO from "./OutputDTO";

export default class RegisterUserOutputDTO implements OutputDTO {
  id: string;
  name: string;
  email: string;
}