import UserRepository from "../../domain/repositories/UserRepository";
import User from "../../domain/User";
import JwtUtil from "../../infrastructure/utils/JWTUtil";
import InvalidCredentialsError from "../errors/InvalidCredentialsError";
import PassworHashingdUtil from "../utils/PasswordHashingUtil";
import UseCase from "./UseCase";

export default class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtUtil: JwtUtil
  ) {}

  public async execute(input: Input): Promise<Output> {
    let user: User;
    try {
      user = await this.userRepository.findByEmail(input.email);
    } catch (error) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await PassworHashingdUtil.verify(
      user.getPassword() as string,
      input.password
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = this.jwtUtil.generateToken({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    });

    return {
      token: token,
      user: {
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
      },
    };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
