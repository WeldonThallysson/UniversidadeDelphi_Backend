import jsonwebtoken from "jsonwebtoken";
import prismaClient from "../../../prisma";
import { hash } from "bcryptjs";
interface IRefinePasswordService {
  tokenPassword: string;
  newPassword: string;
}

class RedefinePasswordService {
  async execute({ tokenPassword, newPassword }: IRefinePasswordService) {
    if (!tokenPassword) {
      return {
        data: {
          message:
            "Por favor informe o token de recuperação de senha enviado no seu email",
          status: 400,
        },
      };
    }
    if (!newPassword) {
      return {
        data: {
          message: "Por favor informe sua nova senha para prosseguir.",
          status: 400,
        },
      };
    }
    try {
      const decoded = jsonwebtoken.verify(
        tokenPassword,
        process.env.JWT_SECRET
      );
      const { userId } = decoded as { userId: string };

      const userExists = await prismaClient.users.findFirst({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return {
          data: {
            message:
              "Não foi possivel prosseguir com a ação, dados do token inválidos.",
            status: 404,
          },
        };
      }

      const newPasswordHash = await hash(newPassword, 8);

      await prismaClient.users.update({
        where: {
          id: userExists.id,
        },
        data: {
          password: newPasswordHash,
        },
      });
      return {
        data: {
          message: "Sua senha foi redefinida com sucesso",
          status: 200,
        },
      };
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return {
          data: {
            message: "Link para redefinição de senha expirado (token).",
            status: 401,
          },
        };
      }
      return {
        data: {
          message: "Erro ao redefinir senha",
          status: 500,
        },
      };
    }
  }
}

export { RedefinePasswordService };
