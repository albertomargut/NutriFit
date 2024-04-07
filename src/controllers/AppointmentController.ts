import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { AppDataSource } from "../database/data-source";
import { CreateAppointmentsRequestBody } from "../types/types";
import { Nutritionist } from "../models/Nutritionist";

//----------------------------------------------------------------------

export class AppointmentController {
  async getAllAppointments(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const AppointmentRepository = AppDataSource.getRepository(Appointment);

      const [allAppointments, count] = await AppointmentRepository.findAndCount({
   
        relations: {
          client: {
            user:true
          },
          nutritionist: {
            user:true
          }
        },
        select: {
          id: true,
          date: true,
          // time:true,
          // client_id: true,
          // nutritionist_id: true,
          

        },
      });
      res.status(200).json({
        count,
        results: allAppointments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findBy({
        client_id: id,
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async getAppointmentByClientId(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);

      const [allAppointments, count] = await appointmentRepository.findAndCount({
       relations: {
        client: {
          user:true
        },
        nutritionist: {
          user:true
        }
       }, 
       where: {
        client_id: id,
      }
      })

      res.status(200).json({
        count,
        results: allAppointments,

    });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async getByNutritionist(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.find({
        where: {
          nutritionist_id: id,
        },
        relations: {
          client: {
            user:true
          },
          nutritionist: {
            user:true
          }

        }
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }
 

  async create(
    req: Request<{}, {}, CreateAppointmentsRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const data = req.body;
      const appointmentRepository = AppDataSource.getRepository(Appointment);

      // Verificar si el nutricionista con el nutritionist_id proporcionado existe en la base de datos
      const nutritionistRepository = AppDataSource.getRepository(Nutritionist);
      const nutritionist = await nutritionistRepository.findOne({
        where: { id: data.nutritionist_id },
      });
      if (!nutritionist) {
        return res
          .status(400)
          .json({ message: "El nutricionista especificado no existe." });
      }

      const newAppointment = await appointmentRepository.save(data);
      res.status(201).json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
    } catch (error: any) {
      console.error("Error while creating Appointment:", error);
      res.status(500).json({
        message: "Error while creating Appointment",
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      await appointmentRepository.update({ id: id }, data);

      res.status(202).json({
        message: "Appointment updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating appointment",
      });
    }
  }
  async delete(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      await appointmentRepository.delete(id);

      res.status(200).json({
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting appointment",
      });
    }
  }
}
