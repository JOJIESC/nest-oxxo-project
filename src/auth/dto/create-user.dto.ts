import { IsString, IsEmail, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
  @IsString()
  userEmail: string;
  @IsString()
  @MinLength(8)
  userPassword: string;
}
