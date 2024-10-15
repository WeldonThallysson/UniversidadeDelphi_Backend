import prismaClient from "../../prisma";

interface IGetAllCategoryService {
  name?: string;
  tag?: string;
  description?: string;
}

class GetAllCategoryService {
  async execute({ name, tag, description }: IGetAllCategoryService) {
    if (name || tag || description) {
      const getAllCategoryFiltered = await prismaClient.category.findMany({
        where: {
          name: name,
          tag: tag,
          description: description,
        },
        select: {
          id: true,
          name: true,
          tag: true,
          status: true,
          description: true,
          created_At: true,
        },
      });
      return {
        data: getAllCategoryFiltered,
        status: 200,
      };
    } else {
      const getAllCategory = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
          tag: true,
          status: true,
          description: true,
          created_At: true,
        },
      });

      return {
        data: getAllCategory,
        status: 200,
      };
    }
  }
}

export { GetAllCategoryService };
