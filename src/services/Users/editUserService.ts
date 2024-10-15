import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface IEditAllUserService {
  id: string;
  name: string;
  email: string;
  masterAccess?: boolean,
  password?: string;
  status?: boolean;
}

class EditUsersService {
  async execute({ id, name, email,masterAccess, password, status }: IEditAllUserService) {
    if (!id) {
      return {
        message: "Para realizar essa ação, preencha o campo (id)",
        status: 400,
      };
    }
    
    const userExists = await prismaClient.users.findFirst({
      where: {
        id: id,
      },
    });
    /*
     if (name === "" || email === "") {
      return {
        message: "Informe os dados obrigatórios (nome,email)",
        status: 400,
      }
    }



    if (nameExists) {
      return {
        message: "Esse email já existe, para editar o usuário tente outro email!",
        status: 400,
      }
    }
    */
   

    let passwordHash;
    if (password) {
      passwordHash = await hash(password, 8);
    }


    await prismaClient.users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        masterAccess: masterAccess,
        password: passwordHash || userExists.password,
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
