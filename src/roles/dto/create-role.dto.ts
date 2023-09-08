import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "What role" })
  @IsString({ message: "Must be a string" })
  readonly value: string;

  @ApiProperty({ example: "Administrator", description: "Role's description" })
  @IsString({ message: "Must be a string" })
  readonly description: string;
}
