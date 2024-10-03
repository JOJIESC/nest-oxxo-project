import { Module } from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { ProvidersController } from "./providers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "./entities/provider.entity";
import { JwtModule } from "@nestjs/jwt";
import { JWT_KEY, EXPIRES_IN } from "../auth/constants/jwt.constants";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN,
      },
      global: true,
    }),
    TypeOrmModule.forFeature([Provider]),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
