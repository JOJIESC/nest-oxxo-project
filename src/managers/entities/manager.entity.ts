import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";
@Entity()
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  managerId: string;
  @Column("text")
  managerFullName: string;
  @Column("float")
  managerSalary: number;
  @Column("text")
  managerEmail: string;
  @Column("text")
  managerPhoneNumber: string;
  //Relation locations

  @OneToOne(() => Location)
  location: Location;

  @OneToOne(() => User)
  @JoinColumn({
    name: "userId",
  })
  user: User;
}
