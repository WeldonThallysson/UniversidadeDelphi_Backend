import prismaClient from "../../../prisma";

interface IAllowAccessUserService {
  email_user: string;
  id_user_logged: string;
  masterAccessParam?: boolean | null;
}

class AllowAccessUserService {
  async execute({
    email_user,
    id_user_logged,
    masterAccessParam,
  }: IAllowAccessUserService) {
    
    if (!email_user) {
      return {
        data: {
          message:
            "Não foi possivel realizar esta ação, por favor envie o email_user do usuário.",
          status: 400,
        },
      };
    }
    if (masterAccessParam === null) {
      return {
        data: {
          message:
            "Não foi possivel realizar esta ação, por favor envie o masterAccessParam do usuário.",
          status: 400,
        },
      };
    }
    
    const userLoggedExists = await prismaClient.users.findFirst({
      where: {
        id: id_user_logged,
      },
    });
    
    const userExists = await prismaClient.users.findFirst({
      where: {
        email: email_user,
      },
    });

    if (!userLoggedExists) {
      return {
        data: {
          message:
            "Não foi possivel realizar esta ação, usuário responsavel não encontrado.",
          status: 400,
        },
      };
    }

    if (!userExists) {
      return {
        data: {
          message:
            "Não foi possivel realizar esta ação, usuário não encontrado.",
          status: 400,
        },
      };
    }

    if ( !userLoggedExists.masterAccess) {
      return {
        data: {
          message: "Você não tem permissão de autorização para esta ação.",
          status: 403,
        },
      };
    }

    if (userExists.id === id_user_logged) {
      return {
        data: {
          message:
            "Não é possivel alterar o próprio tipo de acesso, para está ação entre em contato com o suporte",
          status: 403,
        },
      };
    }

    await prismaClient.users.update({
      where: {
        id: userExists.id,
      },
      data: {
        masterAccess: masterAccessParam ? masterAccessParam : false
      },
    });

    return {
      data: {
        message: "Permissão de autorizações alteradas com sucesso.",
        status: 200,
      },
    };
  }
}

export { AllowAccessUserService };
