import { Pool, QueryResult } from "pg";
import HealthRepository from "../../domain/repositories/HealthRepository";

export default class HealthRepositorySQL implements HealthRepository {
    constructor(private readonly pool: Pool){}
    public async isHealthy(): Promise<boolean> {
        let result: QueryResult;
        try {
            result = await this.pool.query("SELECT 1");
            return !!result.rowCount;
        } catch (error) {
            return false;
        }
    }

}