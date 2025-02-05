import { IsBoolean } from "class-validator";
import OutputDTO from "./OutputDTO";

export default class RetryHookInputDTO extends OutputDTO {
  @IsBoolean()
  healthy: boolean;
}
