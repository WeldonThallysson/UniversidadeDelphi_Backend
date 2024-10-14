import { Request,Response } from "express";
import { RegisterClassService } from "../../services/Class/registerClassService";
import { v2 as cloudinary,UploadApiResponse } from "cloudinary";
import { UploadedFile } from "express-fileupload";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class RegisterClassController {
    async handle(req: Request, res: Response){
        const id_author = req.user_id
        const {
            id_course,
            id_category,
            name, 
            description,
  
            urlVideo,
            idURLVideo,
            tutor,
            tag,
            data,
        } = req.body

        const file = req.files['urlImage'] as UploadedFile
    
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
              message: "Error: urlImage não enviada.",
              status: 400
            })
          }
  
        const resultFile: UploadApiResponse = await new Promise((resolve,reject) => {
            cloudinary.uploader.upload_stream({}, function(err,result){
               if(err){
                 reject(err)
                return; 
               } 
               resolve(result)
            }).end(file.data)
        })



        const registerClass = new RegisterClassService();

        const responseRegisterClass = await registerClass.execute({ 
            id_author, 
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
        })

        return res.status(responseRegisterClass.status).json(responseRegisterClass)
    }
}

export {RegisterClassController}