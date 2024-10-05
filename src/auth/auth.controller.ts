import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.registerUser(CreateUserDto);
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Patch("/:email")
  UpdateUserDto(
    @Param("email") userEmail: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
