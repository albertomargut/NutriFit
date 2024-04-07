import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { Nutritionist } from "./Nutritionist"



// -----------------------------------------------------------------------------

@Entity("appointments")
export class Appointment {

    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column({ nullable: true, default: null }) // Permite valores nulos y establece un valor predeterminado
    client_id!: number;
     
    @Column({ nullable: true, default: null }) // Permite valores nulos y establece un valor predeterminado
    nutritionist_id!: number;
     
    @Column({ type: 'date'})
    date!: Date;

    @Column({type: "time"})
    time!: Date;
  
    @Column()
    created_at!: Date;
  
    @Column()
    updated_at!: Date;

    @ManyToOne(() => Client, (client) => client.appointment)
    @JoinColumn({name: "client_id", referencedColumnName: "id"})
    client!: Client;

    @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.appointment)
     @JoinColumn ({name: "nutritionist_id", referencedColumnName: "id"})
     nutritionist?: Nutritionist;

  
  

 }