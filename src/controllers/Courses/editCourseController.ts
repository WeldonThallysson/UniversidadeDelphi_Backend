import { Request,Response } from "express"; 
import { EditCourseService } from "../../services/Courses/editCourseService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary,UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name:  process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

 
class EditCourseController {
    async handle(req: Request, res: Response){
        const {
            id,
            category_id,
            name, 
            description,
          
            data
        } = req.body

        if(!req.files || Object.keys(req.files).length === 0){
          return res.status(400).json({
            message: "Error: urlImage não enviada.",
            status: 400
          })
        }

        const file = req.files['urlImage'] as UploadedFile
        
        const resultFile: UploadApiResponse = await new Promise((resolve,reject) => {
            cloudinary.uploader.upload_stream({}, function (err,result){
                if(err){
                    reject(err)
                    return;
                }
                resolve(result)
            }).end(file.data)
        })

        const editCourse = new EditCourseService();

        const responseEditCourse = await editCourse.execute({ id, data, category_id, name, description,urlImage: resultFile.url})

        return res.status(responseEditCourse.status).json(responseEditCourse)
    }
}

export {EditCourseController}