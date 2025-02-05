import { IsBoolean } from "class-validator";
import OutputDTO from "./OutputDTO";

export default class RetryHookInputDTO implements OutputDTO {
  @IsBoolean()
  healthy: boolean;
}
