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

    const users = await prismaClient.users.findFirst({
      where: {
        id: user_id
      },

      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        masterAccess: true,
        category: true,
        courses: true,
        class: true,
        created_At: true,
     
      },
    });

    return {
      data: users,
      status: 200
    };
  }
}

export { GetDetailsUserService };
