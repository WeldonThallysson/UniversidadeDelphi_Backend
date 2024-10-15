import prismaClient from "../../prisma";

interface IDeleteCategoryService {
  id: string;
}

class DeleteCategoryService {
  async execute({ id }: IDeleteCategoryService) {
    const categoryExists = await prismaClient.category.findFirst({
      where: { id },
    });

    if (!categoryExists) {
      return {
        message: "Não foi possível deletar, essa categoria não existe!",
        status: 400,
      };
    }

    try {
      await prismaClient.category.delete({
        where: { id },
      });

      return {
        message: "Categoria deletada com sucesso",
        status: 200,
      };
    } catch (error) {
      if (error && 
          error.code === "P2003") {
        return {
          message:
            "Não foi possível deletar a categoria,pois, categoria está vinculada a algum curso ou aula.",
          status: 400,
        };
      }

      // Tratamento para outros erros inesperados
      return {
        message: "Erro inesperado ao deletar a categoria.",
        status: 500,
      };
    }
  }
}

export { DeleteCategoryService };
