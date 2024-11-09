import { Request, Response } from "express";
import { DeleteClassService } from "../../services/Class/deleteClassService";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
class DeleteClassController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteClass = new DeleteClassService();

    await cloudinary.uploader.destroy(`class/${id}`, function (error, result) {
      if (error) {
        console.error("Erro ao deletar imagem do Cloudinary:", error);
      }
    });

    const responseEditClass = await deleteClass.execute({
      id,
    });

    return res.status(responseEditClass.status).json(responseEditClass);
  }
}

export { DeleteClassController };
