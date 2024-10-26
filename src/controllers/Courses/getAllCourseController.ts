import { Request,Response } from "express";   
import { GetAllCourseService } from "../../services/Courses/getAllCourseServices";

class GetAllCourseController {
    async handle(req: Request, res: Response){
        const name = req.query.name as string
        const category_id = req.query.category_id as string
        const page = req.query.page as string;
        const limit = req.query.limit as string;

        
        const getAllCourse = new GetAllCourseService();

        const responseGetAllCourseCourse = await getAllCourse.execute({ 
            category_id,
             name,
             page: Number(page) ? Number(page) : 1,
             limit: Number(limit) ? Number(limit) : 10,
            
            })

        return res.status(responseGetAllCourseCourse.status).json(responseGetAllCourseCourse.data)
    }
}

export {GetAllCourseController}