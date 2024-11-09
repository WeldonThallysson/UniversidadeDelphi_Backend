import { Request,Response } from "express"; 
import { GetAllClassService } from "../../services/Class/getAllClassService";
 
class GetAllClassController {
    async handle(req: Request, res: Response){
     
        const name = req.query.name as string
        const id_category = req.query.id_category as string
        const id_course = req.query.id_course as string
        const tag = req.query.tag as string
        const data = req.query.data as string
        const tutor = req.query.tutor as string
        const page = req.query.page as string;
        const limit = req.query.limit as string;

        const getAllClass = new GetAllClassService();

        const responseGetAllClass = await getAllClass.execute({ 
            name,
            id_category,
            id_course,
            tag,
            data,
            tutor,
            page: Number(page) ? Number(page) : null,
            limit: Number(limit) ? Number(limit) : null,
        })

        return res.status(responseGetAllClass.status).json(responseGetAllClass.data)
    }
}

export {GetAllClassController}