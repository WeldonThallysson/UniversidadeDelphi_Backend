
import {Request,Response} from 'express'
import prismaClient from '../../prisma'
import { RegisterUserService } from '../../services/Users/registerUserService'



class RegisterUserController {
    async handle(req:Request, res:Response){
        const {
            name,  
            email,
            password,
        } = req.body

      
     
        const userRegister = new RegisterUserService()
        const newUser = await userRegister.execute({name,email,password})
    
        res.status(newUser.status).json(newUser)
    }
}


export {RegisterUserController}