import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client"; // Importação do Prisma para acesso aos tipos

interface IGetAllClassService {
  id_category?: string;
  id_course?: string;
  name?: string;
  tag?: string;
  data?: string;
  tutor?: string;
  page?: number; // Agora é opcional
  limit?: number; // Agora é opcional
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
    const skip = limit ? (page - 1) * limit : undefined; // Pula itens apenas se `limit` estiver definido

    // Ajuste dos filtros dinâmicos usando a tipagem correta do Prisma
    const whereClause: Prisma.ClassWhereInput = {
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(id_category && { id_category }),
      ...(id_course && { id_course }),
      ...(tag && { tag: { contains: tag, mode: 'insensitive' } }),
      ...(data && { data: { contains: data, mode: 'insensitive' } }),
      ...(tutor && { tutor: { contains: tutor, mode: 'insensitive' } }),
    };

    // Busca com filtros, paginação condicional e ordenação pelo campo `order`
    const classes = await prismaClient.class.findMany({
      where: whereClause,
      skip,
      take: limit || undefined, // Se `limit` for undefined, retorna todos os registros
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
        page: page || 1, // Define `page` como 1 se não for fornecido
        limit: limit || totalClasses, // Define `limit` como o total se não for fornecido
        totalPages: limit ? Math.ceil(totalClasses / limit) : 1, // Calcula total de páginas ou 1 se `limit` não for definido
      },
      status: 200,
    };
  }
}

export { GetAllClassService };
