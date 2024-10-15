import prismaClient from "../../prisma";

interface IDeleteClassService {
  id: string;
}

class DeleteClassService {
  async execute({ id }: IDeleteClassService) {
    const classExists = await prismaClient.class.findFirst({
      where: { id },
    });

    if (!classExists) {
      return {
        message: "Não foi possível deletar, essa aula não existe!",
        status: 400,
      };
    }

    try {
      await prismaClient.class.delete({
        where: { id },
      });

      return {
        message: "Aula deletada com sucesso!",
        status: 200,
      };
    } catch (error) {
      if (
        error &&
        error.code === "P2003"
      ) {
        return {
          message:
            "Não foi possível deletar a aula. Verifique se ela não está vinculada a algum curso ou categoria.",
          status: 400,
        };
      }

      // Tratamento para outros erros inesperados
      return {
        message: "Erro inesperado ao deletar a aula.",
        status: 500,
      };
    }
  }
}

export { DeleteClassService };
