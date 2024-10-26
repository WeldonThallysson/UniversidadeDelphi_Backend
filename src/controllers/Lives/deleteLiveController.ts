import { Request, Response } from "express";
import { DeleteClassService } from "../../services/Class/deleteClassService";
import { DeleteLiveService } from "../../services/Lives/deleteLiveService";

class DeleteLiveController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteLive = new DeleteLiveService();

    const responseDeleteLive = await deleteLive.execute({
      id,
    });

    return res.status(responseDeleteLive.status).json(responseDeleteLive);
  }
}

export { DeleteLiveController };
