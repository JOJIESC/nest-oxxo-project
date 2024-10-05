import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId: number;

  @ApiProperty({
    default: "Oxxo Juriquilla",
  })
  @Column({ type: "text" })
  locationName: string;

  @ApiProperty({
    default: "Av. Paseo de la República 123, Juriquilla, Querétaro",
  })
  @Column({ type: "text" })
  locationAddress: string;

  @ApiProperty({
    default: [20.722, -100.442],
  })
  @Column({ type: "simple-array" })
  locationLatLng: number[];

  //Relation managers
  @OneToOne(() => Manager, {
    eager: true,
  })
  @JoinColumn({
    name: "managerId",
  })
  manager: Manager;

  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({
    name: "regionId",
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
