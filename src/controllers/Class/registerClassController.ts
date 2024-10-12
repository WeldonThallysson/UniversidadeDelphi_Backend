import { Request,Response } from "express";
import { RegisterClassService } from "../../services/Class/registerClassService";
 
class RegisterClassController {
    async handle(req: Request, res: Response){
        const id_author = req.user_id
        const {
            id_course,
            id_category,
            name, 
            description,
            urlImage,
            urlVideo,
            idURLVideo,
            tutor,
            tag,
            data,
        } = req.body

        const registerClass = new RegisterClassService();

        const responseRegisterClass = await registerClass.execute({ 
            id_author, 
            id_course,
            id_category,
            name, 
            description,
            urlImage,
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