import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  employeeId: string;
  @Column({ type: "text" })
  employeeName: string;
  @Column({ type: "text" })
  employeeLastName: string;
  @Column({ type: "text" })
  employeePhoneNumber: string;
  @Column({ type: "text", unique: true })
  employeeEmail: string;
  @Column({ type: "text", nullable: true })
  employeePhoto: string;

  //Relation
  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({
    name: "locationId",
  })
  location: Location | string;

  @OneToOne(() => User)
  @JoinColumn({
    name: "userId",
  })
  user: User;
}
