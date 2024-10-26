import prismaClient from "../../prisma";

interface IGetAllUserService {
  user_id: string
}

class GetDetailsUserService {
  async execute({ user_id }: IGetAllUserService) {
    const userExists = await prismaClient.users.findFirst({
      where: {
        id: user_id
      },
    });

    if (!userExists) {
      return {
        message: "Esse usuário não existe!",
        status: 400,
      }
    }

    const author = await prismaClient.users.findFirst({
      where: {
        id_author: userExists.id_author
      },
      select: {
        id:true,
        name: true,
        email: true,
        
      }
    })
    const users = await prismaClient.users.findFirst({
      where: {
        id: user_id
      },

      select: {
        id: true,
        id_author: true,
        name: true,
        email: true,
        status: true,
        masterAccess: true,
        category: true,
        courses: true,
        class: true,
        lives: true,
        created_At: true,
     
      },
    });


    const dataItem = {
      items: users,
      author: author
    }
    return {
      data: dataItem,
      status: 200
    };
  }
}

export { GetDetailsUserService };
