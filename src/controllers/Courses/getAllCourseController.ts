import { Request,Response } from "express";   
import { GetAllCourseService } from "../../services/Courses/getAllCourseServices";

class GetAllCourseController {
    async handle(req: Request, res: Response){
        const name = req.query.name as string
        const category_id = req.query.category_id as string

        const getAllCourse = new GetAllCourseService();

        const responseGetAllCourseCourse = await getAllCourse.execute({ category_id, name })

        return res.status(responseGetAllCourseCourse.status).json(responseGetAllCourseCourse.data)
    }
}

export {GetAllCourseController}