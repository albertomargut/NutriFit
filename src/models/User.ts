import { Column, Entity, OneToOne, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { Role } from "./Role" 
import { Client } from "./Client"
import { Nutritionist } from "./Nutritionist"


// -----------------------------------------------------------------------------

@Entity("users")

export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique : true})
    username!: string;

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    
    @Column()
    phone_number!: string

    @Column()
    password_hash!: string;

    @Column({unique : true})
    email!: string;

   @ManyToMany(() => Role, (role) => role.users)
   @JoinTable({
      name: "users_roles",
      joinColumn: {
         name: "user_id",
         referencedColumnName: "id",
      },
      inverseJoinColumn: {
         name: "role_id",
         referencedColumnName: "id",
      },
   })
   roles!: Role[];
   
   
   @OneToOne(() => Client, (client) => client.user)
   client?: Client;

  
    @OneToOne(() => Nutritionist, (nutritionist) => nutritionist.user)
    nutritionist?: Nutritionist;

 
 }

  

 




