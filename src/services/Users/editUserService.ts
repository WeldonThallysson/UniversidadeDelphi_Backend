import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface IEditAllUserService {
  id: string;
  id_user_logged: string
  name: string;
  email: string;
  masterAccess?: boolean,
  password?: string;
  status?: boolean;
}

class EditUsersService {
  async execute({ id,id_user_logged, name, email,masterAccess, password, status }: IEditAllUserService) {
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

    if(!userExistsLogged.masterAccess){
        return {
          message: "Para está ação necessita de um responsável de acesso master!",
         status: 404,
        }
    }
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
   
    if(!userExists){
      return {
        message: "Este usuário não existe!",
        status: 404,
      }
    }

    let passwordHash;
    if (password) {
      passwordHash = await hash(password, 8);
    }

    if(userExistsLogged.masterAccess){
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

    if(masterAccess !== null && !userExistsLogged.masterAccess){
      return {
        message: 'Sua conta não possui permissão para alterar o acesso master, apenas contas de acesso master!',
        status: 401,
      }
    }
    
    await prismaClient.users.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: passwordHash || userExists.password,
        status: status,
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
