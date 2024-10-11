import prismaClient from "../../prisma";

interface IEditAllUserService {
  id: string;
  name: string;
  email: string;
  status?: boolean;
}

class EditUserDetailsService {
  async execute({ id, name, email, status }: IEditAllUserService) {
    if (name === "" || email === "") {
      throw new Error("Error: Informe os dados obrigatórios (nome,email)");
    }

    const emailExists = await prismaClient.users.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      throw new Error("Esse email já existe!");
    }

    const userEdited = await prismaClient.users.update({
      where: {
        id: id,
      },
      data: {
        id: id,
        name: name,
        email: email,
        status: status,
      },
      select: {
        id: true,
        email: true,
        category: true,
        class: true,
        courses: true,
        masterAccess: true,
        status: true,
        created_At: true,
        name: true,
      },
    });

    return userEdited;
  }
}

export { EditUserDetailsService };
