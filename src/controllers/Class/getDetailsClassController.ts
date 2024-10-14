import { Request, Response } from "express";
import { GetAllClassService } from "../../services/Class/getAllClassService";
import { GetDetailsClassService } from "../../services/Class/getDetailsClassService";

class GetDetailsClassController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getDetailsClass = new GetDetailsClassService();
    const responseGetDetailsClass = await getDetailsClass.execute({ id });

    return res
      .status(responseGetDetailsClass.status)
      .json(responseGetDetailsClass.data);
  }
}

export { GetDetailsClassController };
