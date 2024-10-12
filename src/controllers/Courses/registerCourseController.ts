import { Request,Response } from "express";
import { RegisterCourseService } from "../../services/Courses/registerCourseService";

class RegisterCourseController {
    async handle(req: Request, res: Response){
        const id_author = req.user_id
        const {
            category_id,
            name, 
            description,
            urlImage,
            data
        } = req.body

        const registerCourse = new RegisterCourseService();

        const responseRegisterCourse = await registerCourse.execute({id_author,  data, category_id, name, description,urlImage})

        return res.status(responseRegisterCourse.status).json(responseRegisterCourse)
    }
}

export {RegisterCourseController}