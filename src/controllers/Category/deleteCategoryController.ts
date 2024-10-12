import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/Category/deleteCategoryService";

class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteCategory = new DeleteCategoryService();
    const responseDeleteCategory = await deleteCategory.execute({id});

    return res.status(responseDeleteCategory.status).json(responseDeleteCategory);
  }
}

export { DeleteCategoryController };
