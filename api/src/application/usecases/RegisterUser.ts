import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/User";
import UserAlreadyExistsError from "../errors/UserAlreadyExistError";
import PassworHashingdUtil from "../utils/PasswordHashingUtil";
import UseCase from "./UseCase";

export default class RegisterUserUseCase implements UseCase<Input, Output> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(input: Input): Promise<Output> {
    const userExists = await this.userRepository.exists(input.email);
    if(userExists) {
      throw new UserAlreadyExistsError(input.email);
    }

    const passwordHash = await PassworHashingdUtil.hash(input.password);

    const user = User.create(input.name, input.email, passwordHash);

    await this.userRepository.save(user);

    return user;
  }
}

type Input = {
  email: string;
  name: string;
  password: string;
};

type Output = User;
