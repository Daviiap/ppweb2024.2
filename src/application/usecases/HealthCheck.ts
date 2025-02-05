import UseCase from "./UseCase";

export default class HealthCheckUseCase implements UseCase<void, Output> {
  constructor() {}

  async execute(): Promise<Output> {
    return { ok: true };
  }
}

type Output = {
  ok: boolean;
};
