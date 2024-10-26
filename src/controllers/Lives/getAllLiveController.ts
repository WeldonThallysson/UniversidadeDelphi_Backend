import { Request,Response } from "express"; 
import { GetAllClassService } from "../../services/Class/getAllClassService";
import { GetAllLiveService } from "../../services/Lives/getAllLiveService";
 
class GetAllLiveController {
    async handle(req: Request, res: Response){
     
        const name = req.query.name as string
        const id_category = req.query.id_category as string
        const id_course = req.query.id_course as string
        const tag = req.query.tag as string
        const data = req.query.data as string
        const tutor = req.query.tutor as string
        const page = req.query.page as string;
        const limit = req.query.limit as string;

        const getAllLive = new GetAllLiveService();

        const responseGetAllLive = await getAllLive.execute({ 
            name,
            id_category,
            tag,
            data,
            tutor,
            page: Number(page) ? Number(page) : 1,
            limit: Number(limit) ? Number(limit) : 10,
        })

        return res.status(responseGetAllLive.status).json(responseGetAllLive.data)
    }
}

export {GetAllLiveController}