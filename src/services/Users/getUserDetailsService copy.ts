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
        email: true,
        category: true,
        class: true,
        courses: true,
        masterAccess: true,
        status: true,
        created_At: true,
        name: true,
      },
    });

    return users;
  }
}

export { GetDetailsUserService };
