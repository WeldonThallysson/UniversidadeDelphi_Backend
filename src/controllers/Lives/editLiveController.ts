import { Request, Response } from "express";
import { EditClassService } from "../../services/Class/editClassService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { EditLiveService } from "../../services/Lives/editLiveService";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
class EditLiveController {
  async handle(req: Request, res: Response) {
    const {
      id,
      id_category,
      name,
      description,
      urlVideo,
      idURLVideo,
      tutor,
      tag,
      data,
      status,
    } = req.body;

    const editLive = new EditLiveService();

    const file = req.files["urlImage"] as UploadedFile;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        message: "Error: urlImage não enviada.",
        status: 400,
      });
    }
    let urlImage: string | undefined;

    const resultFile: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: `lives/${id}`,
              overwrite: true,
              folder: "lives",
            },
            function (err, result) {
              if (err) {
                reject(err);
                return;
              }
              resolve(result);
            }
          )
          .end(file.data);
      }
    );

    urlImage = resultFile.secure_url;

    const responseEditLive = await editLive.execute({
      id,
      id_category,
      name,
      description,
      urlImage: resultFile.url,
      urlVideo,
      idURLVideo,
      tutor,
      tag,
      data,
      status,
    });

    return res.status(responseEditLive.status).json(responseEditLive);
  }
}

export { EditLiveController };
