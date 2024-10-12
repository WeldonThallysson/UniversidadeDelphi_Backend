import prismaClient from "../../prisma";

interface IDeleteCourseService {
    id: string
    
}

class DeleteCourseService {
    async execute({id}: IDeleteCourseService){
        const courseExists = await prismaClient.courses.findFirst({
             where: {
                id: id
             }
        }) 

        if(!courseExists){
            return {
                message: "Não foi possivel deletar,esse curso não existe !",
                status: 400,
            }
        }


        await prismaClient.courses.delete({
            where: {
             id: id
            },
         
        })

        return {
            message: "Curso deletado com sucesso!",
            status: 200
        }
  
    }
}

export {DeleteCourseService}