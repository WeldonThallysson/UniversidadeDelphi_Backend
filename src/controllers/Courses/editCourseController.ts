import { Request,Response } from "express"; 
import { EditCourseService } from "../../services/Courses/editCourseService";

class EditCourseController {
    async handle(req: Request, res: Response){
        const {
            id,
            category_id,
            name, 
            description,
            urlImage,
            data
        } = req.body

        const editCourse = new EditCourseService();

        const responseEditCourse = await editCourse.execute({ id, data, category_id, name, description,urlImage})

        return res.status(responseEditCourse.status).json(responseEditCourse)
    }
}

export {EditCourseController}