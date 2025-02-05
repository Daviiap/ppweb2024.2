export default interface HealthRepository {
  isHealthy(): Promise<boolean>;
}
