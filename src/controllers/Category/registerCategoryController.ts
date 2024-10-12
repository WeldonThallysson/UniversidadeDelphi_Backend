import { Request, Response } from "express";
import { RegisterCategoryService } from "../../services/Category/registerCategoryService";

class RegisterCategoryController {
  async handle(req: Request, res: Response) {
    const { name, tag, description } = req.body;

    const id_author = req.user_id;

    const registerCategory = new RegisterCategoryService();
    const responseDeleteUser = await registerCategory.execute({
      id_author,
      name,
      tag,
      description,
    });

    return res.json(responseDeleteUser);
  }
}

export { RegisterCategoryController };
