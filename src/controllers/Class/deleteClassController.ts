import { Request, Response } from "express";
import { DeleteClassService } from "../../services/Class/deleteClassService";

class DeleteClassController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteClass = new DeleteClassService();

    const responseEditClass = await deleteClass.execute({
      id,
    });

    return res.status(responseEditClass.status).json(responseEditClass);
  }
}

export { DeleteClassController };
