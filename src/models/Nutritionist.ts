import { Column, Entity, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, ChildEntity} from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";

// -----------------------------------------------------------------------------

@Entity("nutritionists")

export class Nutritionist {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  user_id!: number;

  @Column()
  speciality?: "Sports Nutritionist" | "Clinical Nutritionist" | "Dietitian";

 

  
  @OneToOne(() => User, (user) => user.nutritionist)
  @JoinColumn({ name: "user_id" })
  user!: User;

  
  @OneToMany(() => Appointment, (appointment) => appointment.nutritionist)
  appointment?: Appointment[];


}
