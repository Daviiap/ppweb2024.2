import { Pool } from "pg";
import HealthCheckUseCase from "../usecases/HealthCheck";
import HealthRepository from "../../domain/repositories/HealthRepository";
import UserRepository from "../../domain/repositories/UserRepository";
import RegisterUserUseCase from "../usecases/RegisterUser";

export default class UseCasesFactory {
  constructor(
    private readonly healthRepository: HealthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public createHealthCheckUseCase(): HealthCheckUseCase {
    return new HealthCheckUseCase(this.healthRepository);
  }

  public createRegisterUserUseCase(): RegisterUserUseCase {
    return new RegisterUserUseCase(this.userRepository);
  }
}
