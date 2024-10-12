import { Request,Response } from "express";
import { RegisterCourseService } from "../../services/Courses/registerCourseService";


class RegisterCourseController {
    async handle(req: Request, res: Response){
        const {
            category_id,
            name, 
            description,
            urlImage
        } = req.body

        const registerCourse = new RegisterCourseService();
        const responseRegisterCourse = await registerCourse.execute({category_id, name, description,urlImage})

        return res.json(responseRegisterCourse)
    }
}

export {RegisterCourseController}