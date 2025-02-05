import HealthCheckUseCase from "../usecases/HealthCheck";

export default class UseCasesFactory {
  constructor() {}

  public createHealthCheckUseCase(): HealthCheckUseCase {
    return new HealthCheckUseCase();
  }
}
