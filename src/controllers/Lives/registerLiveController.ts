import { Request,Response } from "express";
import { RegisterClassService } from "../../services/Class/registerClassService";
import { v2 as cloudinary,UploadApiResponse } from "cloudinary";
import { UploadedFile } from "express-fileupload";
import { RegisterLiveService } from "../../services/Lives/registerLiveService";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class RegisterLiveController {
    async handle(req: Request, res: Response){
        const id_author = req.user_id
        const {
         
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
            cloudinary.uploader.upload_stream({
                folder: "lives",
            }, function(err,result){
               if(err){
                 reject(err)
                return; 
               } 
               resolve(result)
            }).end(file.data)
        })



        const registerLive = new RegisterLiveService();

        const responseRegisterLive = await registerLive.execute({ 
            id_author, 
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

        return res.status(responseRegisterLive.status).json(responseRegisterLive)
    }
}

export {RegisterLiveController}