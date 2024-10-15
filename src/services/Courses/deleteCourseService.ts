import prismaClient from "../../prisma";

interface IDeleteCourseService {
  id: string;
}

class DeleteCourseService {
  async execute({ id }: IDeleteCourseService) {
    const courseExists = await prismaClient.courses.findFirst({
      where: { id },
    });

    if (!courseExists) {
      return {
        message: "Não foi possível deletar, esse curso não existe!",
        status: 400,
      };
    }

    try {
      await prismaClient.courses.delete({
        where: { id },
      });

      return {
        message: "Curso deletado com sucesso!",
        status: 200,
      };
    } catch (error) {
      if (
        error &&
        error.code === "P2003"
      ) {
        return {
          message:
            "Não foi possível deletar o curso. Verifique se ele não está vinculado a alguma aula ou categoria.",
          status: 400,
        };
      }

      // Tratamento para outros erros inesperados
      return {
        message: "Erro inesperado ao deletar o curso.",
        status: 500,
      };
    }
  }
}

export { DeleteCourseService };
