import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { clientSeeder }  from "./ClientSeeder";
import { nutritionistSeeder }  from "./NutritionistSeeder";
import { appointmentSeeder } from "./AppointmentSeeder";

(async() => {
    await roleSeeder();
    await userSeeder();
    await clientSeeder();
    await nutritionistSeeder();
    await appointmentSeeder();

})();