import { Request, Response } from "express";
import { EditClassService } from "../../services/Class/editClassService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
class EditClassController {
  async handle(req: Request, res: Response) {
    const {
      id,
      id_course,
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

    const editClass = new EditClassService();

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
        cloudinary.uploader.upload_stream({
              public_id: `class/${id}`,
              overwrite: true,
              folder: "class",
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

    const responseEditClass = await editClass.execute({
      id,
      id_course,
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

    return res.status(responseEditClass.status).json(responseEditClass);
  }
}

export { EditClassController };
