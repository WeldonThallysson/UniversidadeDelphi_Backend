import prismaClient from "../../prisma";

interface IGetDetailsCategoryService {
  id: string;
}

class GetDetailsCategoryService {
  async execute({ id }: IGetDetailsCategoryService) {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        id: id,
      },
    });

    if (!categoryExists) {
      throw new Error("Essa categoria não existe!");
    }

    const categoryDetails = await prismaClient.category.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        tag: true,
        status: true,
        description: true,
        created_At: true,
        id_author: true,
      },
    });

    return categoryDetails;
  }
}

export { GetDetailsCategoryService };
