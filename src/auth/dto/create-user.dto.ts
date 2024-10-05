import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsIn,
} from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends User {
  @ApiProperty({
    default: "email@email.com",
  })
  @IsString()
  userEmail: string;

  @IsString()
  @MinLength(8)
  userPassword: string;

  @ApiProperty({
    default: ["Employee"],
  })
  @IsOptional()
  @IsIn(["Manager", "Employee", "Admin"])
  userRoles: string[];
}
