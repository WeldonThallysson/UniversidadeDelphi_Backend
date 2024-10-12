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
      return {
        message: "Esse usuário não existe!",
        status: 400,
      }
  
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

    return {
      data: users,
      status: 200,
    };
  }
}

export { GetAllUserService };
