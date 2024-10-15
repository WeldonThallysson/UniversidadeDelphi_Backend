import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface ILoginUserType {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: ILoginUserType) {

    if ( email === "" && password === "") {
      return {
        message: "Verifique e preencha os campos (email, senha).",
        status: 400,
      };
    }
    const userExists = await prismaClient.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      return {
        data: {
         message: "Este usuário não existe!"
        },
        status: 400,
      } 
    }

    const verifyPasswordHash = await compare(password, userExists.password);

    if (!verifyPasswordHash) {
      return {
        data: {
          message: "Credenciais email ou senha incorretas.",
        },
        status: 400,
      } 
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
        data: {
          id: userExists.id,
          email: userExists.email,
          token: token,
        },
        status: 200,
    }
  }
}


export {LoginUserService}