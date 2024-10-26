import prismaClient from "../../prisma";

interface IEditLiveService {
  id: string;
  //id_course?: string;
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

class EditLiveService {
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
  }: IEditLiveService) {
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
    /*
    
      if (id_category === "") {
      return {
        message: "Selecione a categoria da live!",
        status: 400,
      };
    }
    */

    if (!id) {
      return {
        message: "Para realizar essa ação, preencha o campo (id)",
        status: 400,
      };
    }
   
    const classExists = await prismaClient.lives.findFirst({
      where: {
        id: id,
      },
    });

    if (!classExists) {
      return {
        message: "Não foi possivel editar, essa live não existe!",
        status: 400,
      };
    }


    await prismaClient.lives.update({
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
      message: "Live editada com sucesso!",
      status: 200,
    };
  }
}

export { EditLiveService };
