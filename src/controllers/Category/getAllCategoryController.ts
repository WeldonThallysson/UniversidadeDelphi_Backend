import { Request, Response } from "express";
import { GetAllCategoryService } from "../../services/Category/getAllCategoryService";

class GetAllCategoryController {
  async handle(req: Request, res: Response) {
    const name  = req.query.name as string;
    const tag  = req.query.tag as string;
    const description = req.query.description as string;
    
    const getAllCategory = new GetAllCategoryService();
    const responseGetAllCategory = await getAllCategory.execute({
      name,
      tag,
      description,
    });

    return res.json(responseGetAllCategory);
  }
}

export { GetAllCategoryController };
