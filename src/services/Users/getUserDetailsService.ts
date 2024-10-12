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
        throw new Error("Esse usuário não existe!")
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

    return users;
  }
}

export { GetDetailsUserService };
