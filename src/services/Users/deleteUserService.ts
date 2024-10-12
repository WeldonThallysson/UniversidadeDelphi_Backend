import prismaClient from "../../prisma";

interface IEditAllUserService {
  id: string;
}

class DeleteUsersService {
  async execute({ id }: IEditAllUserService) {
    if(!id){
        throw new Error("Para realizar esta ação, informe o id usuário.")
    }

    const userExists = await prismaClient.users.findFirst({
      where:  {
        id: id,
      }
    })

    if(!userExists){
      throw new Error("Esse usuário já foi deletado!")
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
