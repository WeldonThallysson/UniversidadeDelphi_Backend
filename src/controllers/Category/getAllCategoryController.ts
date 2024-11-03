import { Request, Response } from "express";
import { GetAllCategoryService } from "../../services/Category/getAllCategoryService";

class GetAllCategoryController {
  async handle(req: Request, res: Response) {
    const name = req.query.name as string;
    const tag = req.query.tag as string;
    const description = req.query.description as string;
    const page = req.query.page as string;
    const limit = req.query.limit as string;
    
    const getAllCategory = new GetAllCategoryService();
    const responseGetAllCategory = await getAllCategory.execute({
      name,
      tag,
      description,
      page: Number(page) ? Number(page) : 1,
      limit: Number(limit) ? Number(limit) : 10,
    });

    return res.status(responseGetAllCategory.status).json(responseGetAllCategory.data);
  }
}

export { GetAllCategoryController };
