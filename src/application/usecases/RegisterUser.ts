import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/User";
import UserAlreadyExistsError from "../errors/UserAlreadyExistError";
import UseCase from "./UseCase";

export default class RegisterUserUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(input: Input): Promise<Output> {
    const userExists = await this.userRepository.exists(input.email);
    if(userExists) {
      throw new UserAlreadyExistsError(input.email);
    }

    const user = User.create(input.name, input.email, input.password);

    await this.userRepository.createUser(user);

    return user;
  }
}

type Input = {
  email: string;
  name: string;
  password: string;
};

type Output = User;
