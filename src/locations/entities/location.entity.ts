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
@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId: number;
  @Column({ type: "text" })
  locationName: string;
  @Column({ type: "text" })
  locationAddress: string;
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
