import { Request, Response } from "express";
import { GetDetailsClassService } from "../../services/Class/getDetailsClassService";
import { GetDetailsLiveService } from "../../services/Lives/getDetailsLiveService";

class GetDetailsLiveController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getDetailsLive = new GetDetailsLiveService();
    const responseGetDetailsLive = await getDetailsLive.execute({ id });

    return res
      .status(responseGetDetailsLive.status)
      .json(responseGetDetailsLive.data);
  }
}

export { GetDetailsLiveController };
