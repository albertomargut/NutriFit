import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isNutritionist } from "../middlewares/isNutritionist";
import { isClient } from "../middlewares/isClient";
// -----------------------------------------------------------------------------

const router = express.Router();
const appointmentController = new AppointmentController();

router.get("/AllAppointments", auth, appointmentController.getAllAppointments)
router.get("/myAppointments/:id", auth, isClient, appointmentController.getAppointmentByClientId)
router.get("/myAppointmentsNutritionists/:id", auth, isNutritionist, appointmentController.getByNutritionist)
router.post("/NewAppointment", auth, isClient, appointmentController.create)
router.patch("/UpdateAppointment/:id", auth, isClient, appointmentController.update);
router.delete("/DeleteAppointment/:id", auth, isClient, appointmentController.delete);



export default router;

