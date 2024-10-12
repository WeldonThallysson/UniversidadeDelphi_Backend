import { Request, Response } from "express";
import { GetAllCategoryService } from "../../services/Category/getAllCategoryService";
import { GetDetailsCategoryService } from "../../services/Category/getDetailsCategoryService";

class GetDetailsCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getDetailsCategory = new GetDetailsCategoryService();
    const responseGetDetailsCategory = await getDetailsCategory.execute({id});

    return res.status(responseGetDetailsCategory.status).json(responseGetDetailsCategory.data);
  }
}

export { GetDetailsCategoryController };
