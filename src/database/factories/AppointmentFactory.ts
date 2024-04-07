import { faker } from "@faker-js/faker";
import { Appointment } from "../../models/Appointment";
import { BaseFactory } from "./BaseFactory";


// -----------------------------------------------------------------------------

export class AppointmentFactory extends BaseFactory<Appointment> {
   protected generateSpecifics(appointment: Appointment): Appointment {
      appointment.date = faker.date.anytime();
      appointment.time  = faker.date.recent();
      appointment.created_at = faker.date.recent();
      appointment.updated_at = faker.date.recent();
    

      return appointment;
   }
}
