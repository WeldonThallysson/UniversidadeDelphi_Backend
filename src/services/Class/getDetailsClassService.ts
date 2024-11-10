import prismaClient from "../../prisma";

interface IGetDetailsClassService {
  id: string
}

class GetDetailsClassService {
  async execute({
   id
  }: IGetDetailsClassService) {
     const classExists = await prismaClient.class.findFirst({
      where: {
        id: id,
      },
    });

    if (!classExists) {
      return {
        data: {
          message: "Essa aula não existe!",
        },
        status: 400,
     }
    }
  
      const getDetailsClass = await prismaClient.class.findFirst({
        where: {
          id
        },
        select:{
            id: true,
            id_author: true,
            idURLVideo: true,
            id_course: true,
            id_category: true,
            name: true,
            description: true,
            data: true,
            tag: true,
            tutor: true,
            urlVideo: true,
            urlImage: true,
            status: true,
            category: true,
            courses: true,
            created_At: true,
        }
      });


      return {
        data: getDetailsClass,
        status: 200,
      };
    }

}

export { GetDetailsClassService };
