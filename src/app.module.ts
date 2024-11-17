import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeesModule } from "./employees/employees.module";
import { ProductsModule } from "./products/products.module";
import { ConfigModule } from "@nestjs/config";
import { ProvidersModule } from "./providers/providers.module";
import { ManagersModule } from "./managers/managers.module";
import { LocationsModule } from "./locations/locations.module";
import { RegionsModule } from "./regions/regions.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_KEY, EXPIRES_IN } from "./auth/constants/jwt.constants";
import { AwsService } from './aws/aws.service';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN,
      },
      global: true,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port: +process.env.port,
      username: "postgres",
      password: process.env.pass,
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeesModule,
    ProductsModule,
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule,
    AwsModule,
  ],
  controllers: [],
  providers: [AwsService],
})
export class AppModule {}
