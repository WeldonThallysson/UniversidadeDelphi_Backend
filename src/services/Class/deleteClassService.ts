import prismaClient from "../../prisma";

interface IDeleteClassService {
  id: string;
}

class DeleteClassService {
  async execute({
    id,
  }: IDeleteClassService) {

    const classExists = await prismaClient.class.findFirst({
      where: {
        id: id,
      },
    });

    if (!classExists) {
      return {
        message: "Não foi possivel deletar, essa aula não existe!",
        status: 400,
      };
    }

    await prismaClient.class.delete({
      where: {
        id: id,
      },
    });

    return {
      message: "Aula deletada com sucesso!",
      status: 200,
    };
  }
}

export { DeleteClassService };
