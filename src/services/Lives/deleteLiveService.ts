import prismaClient from "../../prisma";

interface IDeleteLiveService {
  id: string;
}

class DeleteLiveService {
  async execute({ id }: IDeleteLiveService) {
    const classExists = await prismaClient.lives.findFirst({
      where: { id },
    });

    if (!classExists) {
      return {
        message: "Não foi possível deletar, essa live não existe!",
        status: 400,
      };
    }

    try {
      await prismaClient.class.delete({
        where: { id },
      });

      return {
        message: "Live deletada com sucesso!",
        status: 200,
      };
    } catch (error) {
      if (
        error &&
        error.code === "P2003"
      ) {
        return {
          message:
            "Não foi possível deletar a live. Verifique se ela não está vinculada a algum curso ou categoria.",
          status: 400,
        };
      }

      // Tratamento para outros erros inesperados
      return {
        message: "Erro inesperado ao deletar a live.",
        status: 500,
      };
    }
  }
}

export { DeleteLiveService };
