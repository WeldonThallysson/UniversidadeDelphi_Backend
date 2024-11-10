import prismaClient from "../../prisma";

interface IGetDetailsLiveService {
  id: string
}

class GetDetailsLiveService {
  async execute({
   id
  }: IGetDetailsLiveService) {
     const classExists = await prismaClient.lives.findFirst({
      where: {
        id: id,
      },
    });

    if (!classExists) {
      return {
        data: {
          message: "Essa live não existe!",
        },
        status: 400,
     }
    }
  
      const getDetailsClass = await prismaClient.lives.findFirst({
        where: {
          id
        },
        select:{
            id: true,
            id_author: true,
            id_category: true,
            idURLVideo: true,
            name: true,
            description: true,
            data: true,
            tag: true,
            tutor: true,
            urlVideo: true,
            urlImage: true,
            status: true, 
            category: true,
            order:true,
            users: {
              select: {
                id:true,
                name: true,
                email:true,
                status: true,
                id_author: true
              }
          },
            created_At: true,
        }
      });


      return {
        data: getDetailsClass,
        status: 200,
      };
    }

}

export { GetDetailsLiveService };
