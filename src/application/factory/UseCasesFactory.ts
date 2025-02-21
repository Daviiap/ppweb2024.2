import { Pool } from "pg";
import HealthCheckUseCase from "../usecases/HealthCheck";
import HealthRepository from "../../domain/repositories/HealthRepository";
import UserRepository from "../../domain/repositories/UserRepository";
import RegisterUserUseCase from "../usecases/RegisterUser";
import LoginUseCase from "../usecases/Login";
import JwtUtil from "../../infrastructure/utils/JWTUtil";
import CreateOrganizationUseCase from "../usecases/CreateOrganizationUseCase";
import OrganizationRepository from "../../domain/repositories/OrganizationRepository";
import ProjectRepository from "../../domain/repositories/ProjectRepository";
import CardRepository from "../../domain/repositories/CardRepository";
import UpdateOrganizationUseCase from "../usecases/UpdateOrganizationUseCase";

export default class UseCasesFactory {
  constructor(
    private readonly healthRepository: HealthRepository,
    private readonly userRepository: UserRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly cardRepository: CardRepository,
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

  public createCreateOrganizationUseCase(): CreateOrganizationUseCase {
    return new CreateOrganizationUseCase(this.organizationRepository);
  }
  
  public createUpdateOrganizationUseCase(): UpdateOrganizationUseCase {
    return new UpdateOrganizationUseCase(this.organizationRepository);
  }
}
