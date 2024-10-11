import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface ILoginUserType {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: ILoginUserType) {
    const userExists = await prismaClient.users.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error("Este email não existe");
    }

    const verifyPasswordHash = await compare(password, userExists.password);

    if (!verifyPasswordHash) {
      throw new Error("Sua senha está incorreta");
    }

    const token = sign(
      {
        name: userExists.name,
        password: userExists.password,
      },
      process.env.JWT_SECRET,
      {
        subject: userExists?.id,
        expiresIn: "30d",
      }
    );

    return {
        id: userExists.id,
        email: userExists.email,
        token: token
    }
  }
}


export {LoginUserService}