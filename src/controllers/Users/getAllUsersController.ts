import { Request, Response } from "express";
import { GetAllUserService } from "../../services/Users/getAllUsersSevice";

class GetAllUsersController {
  async handle(req: Request, res: Response) {
    const id_user_logged = req.user_id;
    const name = req.query.name as string;
    const email = req.query.email as string;
    const page = req.query.page as string;
    const limit = req.query.limit as string;

    const getUsers = new GetAllUserService();
    const resultGetUsers = await getUsers.execute({
      id_user_logged,
      email,
      name,
      page: Number(page) ? Number(page) : 1,
      limit: Number(limit) ? Number(limit) : 10,
    });

    return res.status(resultGetUsers.status).json(resultGetUsers.data);
  }
}

export { GetAllUsersController };
