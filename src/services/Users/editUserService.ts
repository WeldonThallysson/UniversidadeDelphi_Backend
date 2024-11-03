import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface IEditAllUserService {
  id: string;
  id_user_logged: string;
  name: string;
  email: string;
  masterAccess?: boolean;
  password?: string;
  status?: boolean;
}

class EditUsersService {
  async execute({ id, id_user_logged, name, email, masterAccess, password, status }: IEditAllUserService) {
    if (!id) {
      return {
        message: "Para realizar essa ação, preencha o campo (id)",
        status: 400,
      };
    }

    const userExistsLogged = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });

    const userExists = await prismaClient.users.findFirst({
      where: {
        id: id,
      },
    });

    if (!userExistsLogged) {
      return {
        message: "Usuário logado não encontrado.",
        status: 404,
      };
    }

    if (!userExists) {
      return {
        message: "Este usuário não existe!",
        status: 404,
      };
    }

    // Verificação de permissões para edição
    if (id !== id_user_logged && !userExistsLogged.masterAccess) {
      return {
        message: "Você não tem permissão para editar outros usuários.",
        status: 403,
      };
    }

    if (masterAccess !== undefined && masterAccess !== userExists.masterAccess && !userExistsLogged.masterAccess) {
      return {
        message: "Sua conta não possui permissão para alterar o acesso master, apenas contas de acesso master!",
        status: 401,
      };
    }

    if (!name || !email) {
      return {
        message: "Informe os dados obrigatórios (nome, email).",
        status: 400,
      };
    }

    const emailExists = await prismaClient.users.findFirst({
      where: {
        email: email,
        id: { not: id },
      },
    });

    if (emailExists) {
      return {
        message: "Esse email já está em uso, tente outro email!",
        status: 400,
      };
    }

    let passwordHash;
    if (password) {
      passwordHash = await hash(password, 8);
    }

    await prismaClient.users.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        masterAccess: userExistsLogged.masterAccess ? masterAccess : userExists.masterAccess,
        password: passwordHash || userExists.password,
        status,
      },
      select: {
        id: true,
        id_author: true,
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
    };
  }
}

export { EditUsersService };
