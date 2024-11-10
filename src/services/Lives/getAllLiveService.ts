import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client"; // Importação do Prisma

interface IGetAllLiveService {
  id_category?: string;
  name?: string;
  tag?: string;
  data?: string;
  tutor?: string;
  page?: number; // Agora é opcional
  limit?: number; // Agora é opcional
}

class GetAllLiveService {
  async execute({
    name,
    id_category,
    tag,
    data,
    tutor,
    page = 1, // Valor padrão para page
    limit,    // Se undefined, buscará todos os registros
  }: IGetAllLiveService) {
    const skip = limit ? (page - 1) * limit : undefined; // Pula itens apenas se `limit` estiver definido

    // Cláusula de filtro dinâmico
    const whereClause: Prisma.LivesWhereInput = {
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(id_category && { id_category }),
      ...(tag && { tag: { contains: tag, mode: 'insensitive' } }),
      ...(data && { data: { contains: data, mode: 'insensitive' } }),
      ...(tutor && { tutor: { contains: tutor, mode: 'insensitive' } }),
    };

    // Busca com filtros e paginação condicional
    const lives = await prismaClient.lives.findMany({
      where: whereClause,
      skip,
      take: limit || undefined, // Se `limit` for undefined, retorna todos os registros
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
        category: true,
        order:true,
        users: {
          select: {
            id:true,
            name: true,
            email:true,
            status: true,
            id_author: true
          }
      },
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
        limit: limit || totalLives, // Define `limit` como o total se não for fornecido
        totalPages: limit ? Math.ceil(totalLives / limit) : 1, // Calcula total de páginas ou 1 se `limit` não for definido
      },
      status: 200,
    };
  }
}

export { GetAllLiveService };
