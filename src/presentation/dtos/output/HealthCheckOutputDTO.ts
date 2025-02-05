import { IsBoolean } from "class-validator";
import OutputDTO from "./OutputDTO";

export default class HealthcheckOutputDTO implements OutputDTO {
  @IsBoolean()
  healthy: boolean;
}
