import prismaClient from "../../prisma";

interface IEditCourseService {
  id: string;
  category_id: string;
  name: string;
  description: string;
  urlImage: string;
  data: string;
}

class EditCourseService {
  async execute({
    id,
    category_id,
    name,
    description,
    urlImage,
    data,
  }: IEditCourseService) {
    const courseExists = await prismaClient.courses.findFirst({
      where: {
        id: id,
      },
    });

    if (!courseExists) {
      return {
        message: "Não foi possivel editar,esse curso não existe !",
        status: 400,
      };
    }

    if (name === "" && description === "") {
      return {
        message: "Preencha os campos (nome, descrição)!",
        status: 400,
      };
    }

    if (category_id === "") {
      return {
        message: "Selecione a categoria do curso!",
        status: 400,
      };
    }

    await prismaClient.courses.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        urlImage,
        category_id,
        data: data,
      },
    });

    return {
      message: "Curso editado com sucesso!",
      status: 200,
    };
  }
}

export { EditCourseService };
