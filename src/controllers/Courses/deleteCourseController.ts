import { Request,Response } from "express";  
import { DeleteCourseService } from "../../services/Courses/deleteCourseService";

class DeleteCourseController {
    async handle(req: Request, res: Response){
        const { id } = req.params

        const deleteCourse = new DeleteCourseService();

        const responseDeleteCourse = await deleteCourse.execute({ id })

        return res.status(responseDeleteCourse.status).json(responseDeleteCourse)
    }
}

export {DeleteCourseController}