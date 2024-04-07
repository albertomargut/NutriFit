import { faker } from "@faker-js/faker";
import { Nutritionist } from "../../models/Nutritionist";
import { BaseFactory } from "./BaseFactory";


// -----------------------------------------------------------------------------

export class NutritionistFactory extends BaseFactory<Nutritionist> {
   protected generateSpecifics(nutritionist: Nutritionist): Nutritionist {
      nutritionist.speciality = faker.helpers.arrayElement(["Sports Nutritionist", "Clinical Nutritionist", "Dietitian"]);
    
      
   
      return nutritionist;
   }
}
