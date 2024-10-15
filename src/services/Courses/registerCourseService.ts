import prismaClient from "../../prisma";

interface IRegisterCourseService {
    id_author: string
    category_id: string,
    name: string, 
    description: string,
    urlImage: string
    data?: string
}

class RegisterCourseService {
    async execute({id_author,data,category_id,name,description,urlImage}: IRegisterCourseService){
        /*
          const courseExists = await prismaClient.courses.findFirst({
             where: {
                name: name
             }
        }) 

        if(courseExists){
            return {
                message: "Não foi possivel cadastrar, esse curso já existe, tente novamente outro nome!",
                status: 400,
            }
        }

        
        */
      
        if(name === "" && description === ""){
            return {
                message: "Preencha os campos (nome, descrição)!",
                status: 400
            }
        }

        if(category_id === ""){
            return {
                message: "Selecione a categoria do curso!",
                status: 400
            }
        }

         await prismaClient.courses.create({
            data: {
             name,
             description,
             urlImage,
             category_id,
             data,
             id_author: id_author
            },
        })

        return {
            message: "Curso cadastrado com sucesso!",
            status: 201
        }
  
    }
}

export {RegisterCourseService}