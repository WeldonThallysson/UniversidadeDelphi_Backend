import { Request, Response } from "express";
import { RegisterCategoryService } from "../../services/Category/registerCategoryService";

class RegisterCategoryController {
  async handle(req: Request, res: Response) {
    const { name,tag, description } = req.body;

    const id_author = req.user_id;

    const registerCategory = new RegisterCategoryService();
    const responseRegisterCategory = await registerCategory.execute({
      id_author,
      name,
      tag,
      description,
    
    });

    return res.status(responseRegisterCategory.status).json(responseRegisterCategory);
  }
}

export { RegisterCategoryController };
