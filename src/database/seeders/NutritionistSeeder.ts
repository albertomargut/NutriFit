import { AppDataSource } from "../data-source";
import { NutritionistFactory } from "../factories/NutritionistFactory";
import { Nutritionist } from "../../models/Nutritionist";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------


export const nutritionistSeeder = async () => {
   try {
     
      await AppDataSource.initialize();

      
      const count = 3;

      
      await seedNutritionistsWithUser(count);

    
      console.log("Seeding nutritionists successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
  
      await AppDataSource.destroy();
   }
};

export const seedNutritionistsWithUser = async (count: number) => {
   
   const nutritionistRepository = AppDataSource.getRepository(Nutritionist);
   const nutritionistFactory = new NutritionistFactory(nutritionistRepository);

   
   const users = await seedUsersWithRoles({
      roles: [UserRoles.NUTRITIONIST],
      count: count,
   });

   
   const nutritionists = nutritionistFactory.createMany(count);

  
   nutritionists.forEach((nutritionist, index) => {
      nutritionist.user = users[index];
   });

  
   await nutritionistRepository.save(nutritionists);

   return nutritionists;
};
