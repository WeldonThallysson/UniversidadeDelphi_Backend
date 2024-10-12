import prismaClient from "../../prisma";

interface IGetDetailsCourseService {
    id: string
    
}

class GetDetailsCourseService {
    async execute({id}: IGetDetailsCourseService){
        const courseExists = await prismaClient.courses.findFirst({
            where: {
              id: id,
            },
          });
      
          if (!courseExists) {
            return {
              message: "Esse curso não existe!",
              status: 400,
           }
          }
      
            const getDetailsCourse = await prismaClient.courses.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    class: true,    
                    data: true,
                    category_id: true,
                    id_author: true,
                    urlImage: true,
                    status: true,
                    created_At: true
                }
            })
    
            return {
                data: getDetailsCourse,
                status: 200
            }
        }
}

export {GetDetailsCourseService}