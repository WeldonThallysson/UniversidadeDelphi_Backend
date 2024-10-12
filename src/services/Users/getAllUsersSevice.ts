import prismaClient from "../../prisma";

interface IGetAllUserService {
  name: string;
  email: string;
}

class GetAllUserService {
  async execute({ name, email }: IGetAllUserService) {
    const userExists = await prismaClient.users.findFirst({
      where: {
        name: name,
        email: email,
      },
    });

    if (!userExists) {
        throw new Error("Esse usuário não existe!")
    }

    const users = await prismaClient.users.findMany({
      where: {
        name: name,
        email: email,
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

export { GetAllUserService };
