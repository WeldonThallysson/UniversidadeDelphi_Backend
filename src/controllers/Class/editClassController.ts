import { Request,Response } from "express";
import { EditClassService } from "../../services/Class/editClassService";

class EditClassController {
    async handle(req: Request, res: Response){
    
        const {
            id,
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
            status
        } = req.body

        const editClass = new EditClassService();

        const responseEditClass = await editClass.execute({ 
            id,
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
            status
        })

        return res.status(responseEditClass.status).json(responseEditClass)
    }
}

export {EditClassController}