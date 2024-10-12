import prismaClient from "../../prisma";

interface IEditAllUserService {
  id: string;
  name: string;
  email: string;
  status?: boolean;
}

class EditUsersService {
  async execute({ id, name, email, status }: IEditAllUserService) {
    if (name === "" || email === "") {
      return {
        message: "Informe os dados obrigatórios (nome,email)",
        status: 400,
      }
    }

    const emailExists = await prismaClient.users.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return {
        message: "Esse email já existe, para editar o usuário tente outro email!",
        status: 400,
      }
    }

    await prismaClient.users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        status: status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        masterAccess: true,
        status: true,
        created_At: true,
      },
    });

    return {
      message: 'Usuário editado com sucesso!',
      status: 200,
   
    };;
  }
}

export { EditUsersService };
