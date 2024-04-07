import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/getAllUsers", auth, isAdmin, userController.getAll);
router.get("/getAllNutritionists", userController.getAllNutritionist);//traemos todos los nutricionistas
router.get("/:id", auth, isAdmin, userController.getById);
router.get("/getNutritionistUser/:id", auth, isAdmin, userController.getNutritionistUser);//NOS TRAEMOS EL USER_ID DE NUESTRO NUTRICIONISTA
router.get("/getClientUser/:id", auth, isAdmin, userController.getClientUser);//NOS TRAEMOS EL USER_ID DE NUESTRO CLIENTE
router.get("/getClientByUser/:id",  auth, isAdmin, userController.getClientByUser);//NOS TRAEMOS EL CLIENTE Y EL USER, SUS CITAS Y LOS DETALLES DEL TATUADOR, TODO CON EL ID DE USER(TOKEN DESDE EL FRONT)
router.get("/getNutritionistByUser/:id", auth, isAdmin, userController.getNutritionistByUser);//NOS TRAEMOS EL NUTRICIONISTA Y EL USER, LOS DISEÑOS DEL NUTRICIONISTA, SUS CITAS Y LOS DETALLES DEL CLIENTE, TODO CON EL ID DE USER(TOKEN DESDE EL FRONT)
router.post("/", auth, isAdmin, userController.create);
router.post("/CreateNutritionist", auth, isAdmin, userController.createNutritionist);
router.patch("/update/:id", auth, isAdmin, userController.update);
router.delete("/delete/:id", auth, isAdmin, userController.delete);


export default router;
