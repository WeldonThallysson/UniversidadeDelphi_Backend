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

export { GetAllUserService };
