import {
  IsString,
  IsEmail,
  IsNumber,
  MaxLength,
  IsObject,
  IsOptional,
} from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "../../locations/entities/location.entity";
export class CreateManagerDto extends Manager {
  @IsString()
  @MaxLength(80)
  managerFullName: string;
  @IsNumber()
  managerSalary: number;
  @IsString()
  @IsEmail()
  managerEmail: string;
  @IsString()
  @MaxLength(16)
  managerPhoneNumber: string;
  //Relation locations
  @IsObject()
  @IsOptional()
  location: Location;
}
