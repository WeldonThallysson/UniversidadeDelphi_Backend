import { Request, Response } from "express";
import { DeleteClassService } from "../../services/Class/deleteClassService";
import { DeleteLiveService } from "../../services/Lives/deleteLiveService";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
class DeleteLiveController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteLive = new DeleteLiveService();

    await cloudinary.uploader.destroy(`lives/${id}`, function (error, result) {
      if (error) {
        console.error("Erro ao deletar imagem do Cloudinary:", error);
      }
    });

    const responseDeleteLive = await deleteLive.execute({
      id,
    });

    return res.status(responseDeleteLive.status).json(responseDeleteLive);
  }
}

export { DeleteLiveController };
