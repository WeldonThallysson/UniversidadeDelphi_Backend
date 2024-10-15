import prismaClient from "../../prisma";

interface IEditClassService {
  id: string;
  id_course?: string;
  id_category: string;
  name: string;
  description: string;
  urlImage: string;
  urlVideo: string;
  idURLVideo?: string;
  tutor?: string;
  tag: string;
  data?: string;
  status?: string;
}

class EditClassService {
  async execute({
    id,
    id_category,
    name,
    description,
    urlImage,
    urlVideo,
    idURLVideo,
    tag,
    tutor,
    data,
    status,
  }: IEditClassService) {
    if (
      name === "" &&
      description === "" &&
      urlImage === "" &&
      urlVideo === ""
    ) {
      return {
        message: "Preencha os campos (nome, descrição, urlImage e urlVideo)!",
        status: 400,
      };
    }

    if (id_category === "") {
      return {
        message: "Selecione a categoria da aula!",
        status: 400,
      };
    }

    if (!id) {
      return {
        message: "Para realizar essa ação, preencha o campo (id)",
        status: 400,
      };
    }
   
    const classExists = await prismaClient.class.findFirst({
      where: {
        id: id,
      },
    });

    if (!classExists) {
      return {
        message: "Não foi possivel editar, essa aula não existe!",
        status: 400,
      };
    }


    await prismaClient.class.update({
      where: {
        id: id,
      },
      data: {
        data,
        id_category,
        name,
        description,
        urlImage,
        urlVideo,
        idURLVideo,
        tag,
        tutor,
        status: status === 'true' ? true : false
      },
      
    });

    return {
      message: "Aula editada com sucesso!",
      status: 200,
    };
  }
}

export { EditClassService };
