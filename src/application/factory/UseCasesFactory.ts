import { Pool } from "pg";
import HealthCheckUseCase from "../usecases/HealthCheck";
import HealthRepository from "../../domain/repositories/HealthRepository";

export default class UseCasesFactory {
  constructor(
    private readonly healthRepository: HealthRepository
  ) {}

  public createHealthCheckUseCase(): HealthCheckUseCase {
    return new HealthCheckUseCase(this.healthRepository);
  }
}
