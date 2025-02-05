import UseCase from "./UseCase";
import HealthRepository from "../../domain/repositories/HealthRepository";

export default class HealthCheckUseCase implements UseCase<void, Output> {
  constructor(private readonly healthRepository: HealthRepository) {}

  async execute(): Promise<Output> {
    return { ok: await this.healthRepository.isHealthy() };
  }
}

type Output = {
  ok: boolean;
};
