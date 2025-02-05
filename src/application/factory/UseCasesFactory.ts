import { Pool } from "pg";
import HealthCheckUseCase from "../usecases/HealthCheck";
import HealthRepository from "../../domain/repositories/HealthRepository";
import UserRepository from "../../domain/repositories/UserRepository";
import RegisterUserUseCase from "../usecases/RegisterUser";
import LoginUseCase from "../usecases/Login";
import JwtUtil from "../../infrastructure/utils/JWTUtil";

export default class UseCasesFactory {
  constructor(
    private readonly healthRepository: HealthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtUtil: JwtUtil
  ) {}

  public createHealthCheckUseCase(): HealthCheckUseCase {
    return new HealthCheckUseCase(this.healthRepository);
  }

  public createRegisterUserUseCase(): RegisterUserUseCase {
    return new RegisterUserUseCase(this.userRepository);
  }

  public createLoginUseCase(): LoginUseCase {
    return new LoginUseCase(this.userRepository, this.jwtUtil);
  }
}
