import { Request,Response } from "express";
import prismaClient from "../../prisma";

interface IRegisterCourseService {
    category_id: string,
    name: string, 
    description: string,
    urlImage: string
}

class RegisterCourseService {
    async execute({category_id,name,description,urlImage}: IRegisterCourseService){
        const courseExists = await prismaClient.courses.findFirst({
             where: {
                name: name
             }
        }) 

        if(courseExists){
            throw new Error("Esse curso já existe, tente novamente outro nome!")
        }

         await prismaClient.courses.create({
            data: {
             name,
             description,
             urlImage,
             category_id,
            },
            
        })

        return {
            message: "Curso cadastrado com sucesso!",
            status: 200
        }
  
    }
}

export {RegisterCourseService}