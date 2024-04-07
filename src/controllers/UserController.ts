import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { Nutritionist } from "../models/Nutritionist";
import { Client } from "../models/Client";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";

// -----------------------------------------------------------------------------

export class UserController implements Controller {
  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const allUsers = await userRepository.find();

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting users",
      });
    }
  }

  async getAllPerPage(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const userRepository = AppDataSource.getRepository(User);

      let { page, skip } = req.query;

      let currentPage = page ? +page : 1;
      let itemsPerPage = skip ? +skip : 10;

      const [allUsers, count] = await userRepository.findAndCount({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        select: {
          username: true,
          email: true,
          id: true,
          password_hash: false,
        },
      });
      res.status(200).json({
        count,
        skip: itemsPerPage,
        page: currentPage,
        results: allUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while getting users",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

  async create(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const data = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const newUser = await userRepository.save(data);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({
        message: "Error while creating user",
        error,
      });
    }
  }

  async createNutritionist(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const data = req.body;

      const userRepository = AppDataSource.getRepository(Nutritionist);
      const newNutritionist = await userRepository.save(data);
      res.status(201).json(newNutritionist);
    } catch (error) {
      res.status(500).json({
        message: "Error while creating nutritionist",
        error,
      });
    }
  }



  async delete(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.delete(id);

      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting user",
      });
    }
  }

  async getAllNutritionist(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const nutritionistRepository = AppDataSource.getRepository(Nutritionist);
      const allNutritionists = await nutritionistRepository.find({
        relations: {
          user: true,
        },
      });

      res.status(200).json(allNutritionists);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting nutritionists",
      });
    }
  }

  async getNutritionistUser(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const nutritionistRepository = AppDataSource.getRepository(Nutritionist);

      const nutritionist = await nutritionistRepository.findOneBy({
        id: id,
      });

      if (!nutritionist) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const nutritionistUser = Number(nutritionist.user_id);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: nutritionistUser,
      });
      // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...nutritionist,
        ...user,
      };
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = nutritionist.id;

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

  async getClientUser(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const clientRepository = AppDataSource.getRepository(Client);

      const client = await clientRepository.findOneBy({
        id: id,
      });

      if (!client) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const clientUser = Number(client.user_id);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: clientUser,
      });
      // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...client,
        ...user,
      };
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = client.id;

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

  async getClientByUser(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const userClient = Number(user.id);
      const clientRepository = AppDataSource.getRepository(Client);
      const client = await clientRepository.findOneBy({
        user_id: userClient,
      });

      const clientId = Number(client?.id);

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointment = await appointmentRepository.find({
        where: { client_id: clientId },
        relations: {
          nutritionist: true,
        },
        select: {
          id: true,

          nutritionist: {
            speciality: true,
          },
        },
      });

      // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...client,
        ...user,
        appointment,
      };
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = client!.id;

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

  async getNutritionistByUser(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const userNutritionist = Number(user.id);
      const nutritionistRepository = AppDataSource.getRepository(Nutritionist);
      const nutritionist = await nutritionistRepository.findOneBy({
        user_id: userNutritionist,
      });

      const nutritionistId = Number(nutritionist?.id);

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointment = await appointmentRepository.find({
        where: { nutritionist_id: nutritionistId },
        relations: {
          client: true,
        },
        select: {
          id: true,
        },
      });

      // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...nutritionist,
        //  ...design,
        ...user,
        appointment,
      };
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = nutritionist!.id;

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }
}
