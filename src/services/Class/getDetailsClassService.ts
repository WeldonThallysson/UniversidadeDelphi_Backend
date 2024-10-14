import prismaClient from "../../prisma";

interface IGetDetailsClassService {
  id: string
}

class GetDetailsClassService {
  async execute({
   id
  }: IGetDetailsClassService) {

  
      const getDetailsClass = await prismaClient.courses.findFirst({
        where: {
          id
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
