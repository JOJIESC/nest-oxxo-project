import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiAuth } from "src/auth/decorators/api.decorator";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { TOKEN_NAME } from "./constants/jwt.constants";
import { Cookies } from "./decorators/cookies.decorator";
import { Query } from "@nestjs/common";
@ApiAuth()
@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/employee/[id]")
  registerEmployee(
    @Body() createUserDto: CreateUserDto,
    @Param("id") id: string
  ) {
    if (
      createUserDto.userRoles.includes("Admin") ||
      createUserDto.userRoles.includes("Manager")
    ) {
      throw new BadRequestException("Rol invalido");
    }
    return this.authService.registerEmployee(id, createUserDto);
  }

  @Post("register/:id")
  registerManager(
    @Query("role") role: string,
    @Body() createUserDto: CreateUserDto,
    @Param("id") id: string
  ) {
    if (role === "manager") {
      return this.authService.registerManager(id, createUserDto);
    } else if (role === "employee") {
      return this.authService.registerEmployee(id, createUserDto);
    }
    throw new BadRequestException("Rol inválido");
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies() cookies: any
  ) {
    const token = await this.authService.loginUser(loginUserDto);
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDay() + 7);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: process.env.cookiesDomain,
      expires: expireDate,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return;
  }

  @Patch("/:email")
  UpdateUserDto(
    @Param("email") userEmail: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
