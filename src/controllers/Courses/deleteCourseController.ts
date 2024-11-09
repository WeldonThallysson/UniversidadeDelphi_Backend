import { Request,Response } from "express";  
import { DeleteCourseService } from "../../services/Courses/deleteCourseService";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class DeleteCourseController {
    async handle(req: Request, res: Response){
        const { id } = req.params

        const deleteCourse = new DeleteCourseService();


      await cloudinary.uploader.destroy(`courses/${id}`, function (error, result) {
            if (error) {
              console.error("Erro ao deletar imagem do Cloudinary:", error);
            }
          });
        const responseDeleteCourse = await deleteCourse.execute({ id })

        return res.status(responseDeleteCourse.status).json(responseDeleteCourse)
    }
}

export {DeleteCourseController}