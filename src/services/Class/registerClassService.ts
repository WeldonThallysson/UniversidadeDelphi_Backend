import prismaClient from "../../prisma";

interface IRegisterClassService {
  id_author: string;
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
}

class RegisterClassService {
  async execute({
    id_author,
    id_category,
    name,
    description,
    urlImage,
    urlVideo,
    idURLVideo,
    tag,
    tutor,
    data,
  }: IRegisterClassService) {
    /*
    const classExists = await prismaClient.class.findFirst({
      where: {
        name: name,
      },
    });

    if (classExists) {
      return {
        message:
          "Não foi possivel cadastrar, essa aula já existe, tente novamente outro nome!",
        status: 400,
      };
    }
     */
    
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

    await prismaClient.class.create({
      data: {
        id_author,
        data,
        id_category,
        name,
        description,
        urlImage,
        urlVideo,
        idURLVideo,
        tag,
        tutor,
      },
    });

    return {
      message: "Aula cadastrada com sucesso!",
      status: 201,
    };
  }
}

export { RegisterClassService };
