import prismaClient from "../../prisma";

interface IGetAllCategoryService {
  name?: string;
  tag?: string;
  description?: string;
  page: number;
  limit: number;
}

class GetAllCategoryService {
  async execute({ name, tag, description, page, limit }: IGetAllCategoryService) {
    const skip = (page - 1) * limit;

    const whereClause = {
      ...(name && { name: { contains: name, mode: "insensitive" } }), // Aplica 'contains' no campo 'name'
      ...(tag && { tag: { contains: tag, mode: "insensitive" } }),     // Aplica 'contains' no campo 'tag'
      ...(description && { description: { contains: description, mode: "insensitive" } } as any), // Aplica 'contains' no campo 'description'
    };

    // Busca com paginação e filtros (se fornecidos)
    const categories = await prismaClient.category.findMany({
      where: whereClause,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        tag: true,
        status: true,
        description: true,
        created_At: true,
      },
    });

    // Contagem total de categorias (para saber quantas páginas existem)
    const totalCategories = await prismaClient.category.count({
      where: whereClause,
    });

    return {
      data: {
        items: categories,
        total: totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
        page,
        limit,
      },
      status: 200,
    };
  }
}

export { GetAllCategoryService };
