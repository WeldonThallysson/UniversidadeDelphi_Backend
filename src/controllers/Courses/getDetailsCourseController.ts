import { Request,Response } from "express";   
import { GetDetailsCourseService } from "../../services/Courses/getDetailsCourseServices";

class GetDetailsCourseController {
    async handle(req: Request, res: Response){
        const { id } = req.params

        const detailsCourse = new GetDetailsCourseService();

        const responseDetailsCourse = await detailsCourse.execute({ id })

        return res.status(responseDetailsCourse.status).json(responseDetailsCourse.data)
    }
}

export {GetDetailsCourseController}