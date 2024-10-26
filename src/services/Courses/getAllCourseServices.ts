import prismaClient from "../../prisma";

interface IGetCourseService {
  category_id?: string;
  name?: string;
  id_author?: string;
  page: number;
  limit: number;
}

class GetAllCourseService {
  async execute({ category_id, name, id_author, page, limit }: IGetCourseService) {
    const skip = (page - 1) * limit; // Calcula quantos itens serão pulados

    const whereClause = {
      ...(name && { name: { contains: name, mode: 'insensitive' } } as any),
      ...(category_id && { category_id }),
      ...(id_author && { id_author }),
    };

    // Busca com filtros, paginação e contagem total
    const courses = await prismaClient.courses.findMany({
      where: whereClause,
      skip,
      take: limit,
      select: {
        id: true,
        id_author: true,
        category_id: true,
        name: true,
        description: true,
        class: true,
        data: true,
        urlImage: true,
        status: true,
        created_At: true,
      },
    });

    const totalCourses = await prismaClient.courses.count({
      where: whereClause,
    });

    return {
      data: courses,
      total: totalCourses,
      page,
      limit,
      totalPages: Math.ceil(totalCourses / limit), // Total de páginas
      status: 200,
    };
  }
}

export { GetAllCourseService };