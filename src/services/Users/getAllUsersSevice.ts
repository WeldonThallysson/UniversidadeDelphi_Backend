import prismaClient from "../../prisma";

interface IGetAllUserService {
  id_user_logged: string
  name: string;
  email: string;
  page: number
  limit: number
}

class GetAllUserService {
  async execute({ id_user_logged, name, email, page = 1,limit = 10}: IGetAllUserService) {
    const skip = (page - 1) * limit
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
        id: {
          not: id_user_logged,
         
        },
        masterAccess: {
          not: true,
        },
        name: name,
        email: email,
        
      },
      skip,
      take: limit,
      select: {
        id: true,
        id_author: true,
        name: true,
        email: true,
        status: true,
        masterAccess: true,
        created_At: true,
      },
    });

  
    const totalUsers = await prismaClient.users.count({
      where: {
        id: {
          not: id_user_logged,
        },
        name: name,
        email: email,
      },
    });


    return {
      data: {
        items: users,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        page: page,
        limit: limit,
        status: 200,
      },
      status: 200,
    };
  }
}

export { GetAllUserService };
