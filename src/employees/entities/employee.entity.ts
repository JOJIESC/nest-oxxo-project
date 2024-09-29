import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "src/locations/entities/location.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employeeId: string;
  @Column({ type: "text" })
  name: string;
  @Column({ type: "text" })
  lastName: string;
  @Column({ type: "text" })
  phoneNumber: string;
  @Column({ type: "text" })
  email: string;
  @Column({ type: "text", nullable: true })
  photoUrl: string;

  //Relation
  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({
    name: "locationId",
  })
  location: Location;
}
