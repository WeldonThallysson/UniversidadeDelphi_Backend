import { Request, Response } from "express";
import { EditCategoryService } from "../../services/Category/editCategoryService";
 
class EditCategoryController {
  async handle(req: Request, res: Response) {
    const { id, name, tag, description } = req.body;
 
    const editCategory = new EditCategoryService();
    const responseEditCategory = await editCategory.execute({
      id,
      name,
      tag,
      description,
    });

    return res.status(responseEditCategory.status).json(responseEditCategory);
  }
}

export { EditCategoryController };
