import { Request,Response } from "express";
import { RegisterCourseService } from "../../services/Courses/registerCourseService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
class RegisterCourseController {
    async handle(req: Request, res: Response){
        const id_author = req.user_id
        

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

        const {
            category_id,
            name, 
            description,
        
            data
        } = req.body

        const registerCourse = new RegisterCourseService();

        const responseRegisterCourse = await registerCourse.execute({id_author,  data, category_id, name, description, urlImage: resultFile.url})

        return res.status(responseRegisterCourse.status).json(responseRegisterCourse)
    }
}

export {RegisterCourseController}