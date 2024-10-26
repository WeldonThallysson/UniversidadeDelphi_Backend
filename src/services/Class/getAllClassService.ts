import prismaClient from "../../prisma";

interface IGetAllClassService {
  id_category?: string;
  id_course?: string;
  name?: string;
  tag?: string;
  data?: string;
  tutor?: string;
  page: number;
  limit: number;
}

class GetAllClassService {
  async execute({
    name,
    id_category,
    id_course,
    tag,
    data,
    tutor,
    page,
    limit,
  }: IGetAllClassService) {
    const skip = (page - 1) * limit;

    // Ajuste dos filtros dinâmicos usando a tipagem correta do Prisma
    const whereClause = {
      ...(name && { name: { contains: name, mode: 'insensitive' } as any }),
      ...(id_category && { id_category }),
      ...(id_course && { id_course }),
      ...(tag && { tag: { contains: tag, mode: 'insensitive' } as any }),
      ...(data && { data: { contains: data, mode: 'insensitive' } as any }),
      ...(tutor && { tutor: { contains: tutor, mode: 'insensitive' } as any }),
    };

    // Busca com filtros, paginação e ordenação pelo campo `order`
    const classes = await prismaClient.class.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { order: 'asc' }, // Ordena por `order` em ordem crescente
      select: {
        id: true,
        id_author: true,
        idURLVideo: true,
        id_course: true,
        id_category: true,
        name: true,
        description: true,
        data: true,
        tag: true,
        tutor: true,
        urlVideo: true,
        urlImage: true,
        order: true, // Inclui o campo `order` no retorno
        status: true,
        created_At: true,
      },
    });

    // Contagem total para paginação
    const totalClasses = await prismaClient.class.count({
      where: whereClause,
    });

    return {
      data: {
        items: classes,
        total: totalClasses,
        totalPages: Math.ceil(totalClasses / limit),
        page,
        limit,
      },
    
      status: 200,
    };
  }
}

export { GetAllClassService };
