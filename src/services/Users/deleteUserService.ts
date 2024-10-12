import prismaClient from "../../prisma";

interface IEditAllUserService {
  id: string;
}

class DeleteUsersService {
  async execute({ id }: IEditAllUserService) {
    if(!id){
      return {
        message: "Para realizar esta ação, informe o id usuário.",
        status: 400,
      }
    }

    const userExists = await prismaClient.users.findFirst({
      where:  {
        id: id,
      }
    })

    if(!userExists){
      return {
        message: "Não foi possivel deletar,esse usuário não existe!",
        status: 400,
      }
    }

     await prismaClient.users.delete({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,

        }
    })
  
    return {
      message: 'Usuário deletado com sucesso!',
      status: 200,
   
    };
  }
}

export { DeleteUsersService };
