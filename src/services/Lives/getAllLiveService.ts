import prismaClient from "../../prisma";

interface IGetAllLiveService {
  id_category?: string;
  name?: string;
  tag?: string;
  data?: string;
  tutor?: string;
  page: number;
  limit: number;
}

class GetAllLiveService {
  async execute({
    name,
    id_category,
    tag,
    data,
    tutor,
    page,
    limit,
  }: IGetAllLiveService) {
    const skip = (page - 1) * limit; // Calcula quantos itens pular

    // Cláusula de filtro dinâmico
    const whereClause = {
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(id_category && { id_category }),
      ...(tag && { tag: { contains: tag, mode: 'insensitive' } }),
      ...(data && { data: { contains: data, mode: 'insensitive' } }),
      ...(tutor && { tutor: { contains: tutor, mode: 'insensitive' } } as any),
    };

    // Busca com filtros e paginação
    const lives = await prismaClient.lives.findMany({
      where: whereClause,
      skip,
      take: limit,
      select: {
        id: true,
        id_author: true,
        id_category: true,
        idURLVideo: true,
        name: true,
        description: true,
        data: true,
        tag: true,
        tutor: true,
        urlVideo: true,
        urlImage: true,
        status: true,
        created_At: true,
      },
    });

    // Contagem total para paginação
    const totalLives = await prismaClient.lives.count({
      where: whereClause,
    });

    return {
      data: {
        items: lives,
        total: totalLives,
        page,
        limit,
        totalPages: Math.ceil(totalLives / limit), // Calcula total de páginas
      },
      status: 200,
    };
  }
}

export { GetAllLiveService };