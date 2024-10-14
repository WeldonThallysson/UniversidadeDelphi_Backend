import prismaClient from "../../prisma";

interface IGetDetailsClassService {
  id: string
}

class GetDetailsClassService {
  async execute({
   id
  }: IGetDetailsClassService) {

  
      const getDetailsClass = await prismaClient.class.findFirst({
        where: {
          id
        },
        select:{
            id: true,
            name: true,
            description: true,
            data: true,
            tag: true,
            tutor: true,
            urlVideo: true,
            urlImage: true,
            id_author: true,
            idURLVideo: true,
            id_course: true,
            id_category: true,
            status: true,
            created_At: true,
        }
      });

      if(!getDetailsClass){
         return {
          data: {
            message: "Essa aula não existe!",
            status: 400,
          }
         }
      }

      return {
        data: getDetailsClass,
        status: 200,
      };
    }

}

export { GetDetailsClassService };
