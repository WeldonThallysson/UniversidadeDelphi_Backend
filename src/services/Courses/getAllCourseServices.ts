import prismaClient from "../../prisma";

interface IGetCourseService {
  category_id?: string;
  name?: string;
  id_author?: string;
  page?: number | null; // Agora é opcional
  limit?: number | null; // Agora é opcional
}

class GetAllCourseService {
  async execute({ category_id, name, id_author, page, limit }: IGetCourseService) {
    // Define o número de itens a serem pulados apenas se `limit` for definido
    const skip = limit ? (page - 1) * limit : undefined;

    const whereClause = {
      ...(name && { name: { contains: name, mode: 'insensitive' } } as any),
      ...(category_id && { category_id }),
      ...(id_author && { id_author }),
    };

    // Configura a query para buscar todos os itens se `limit` não for definido
    const courses = await prismaClient.courses.findMany({
      where: whereClause,
      skip,
      take: limit || undefined, // Se `limit` for `undefined`, retorna todos
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
        category: true,
        users:true,
        created_At: true,
       

      },
    });

    const totalCourses = await prismaClient.courses.count({
      where: whereClause,
    });

    return {
      data: {
        items: courses,
        total: totalCourses,
        page,
        limit: limit || totalCourses, // Define `limit` como o total de cursos se não for fornecido
        totalPages: limit ? Math.ceil(totalCourses / limit) : 1, // Calcula o total de páginas ou define como 1 se `limit` não for fornecido
        status: 200,
      }
    };
  }
}

export { GetAllCourseService };
