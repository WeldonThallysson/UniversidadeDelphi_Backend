
import {Request,Response} from 'express'
import { LoginUserService } from '../../services/Users/loginService'


class LoginUserController {
    async handle(req: Request, res:Response){
        const {
            email,
            password,
        } = req.body
    
        const loginUser = new LoginUserService()
        const users = await loginUser.execute({email,password})
        

        return res.json(users)
    }

}

export {LoginUserController}