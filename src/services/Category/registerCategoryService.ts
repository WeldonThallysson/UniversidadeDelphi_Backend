import prismaClient from "../../prisma"


interface IRegisterCategoryService {
    id_author: string
    name: string
    tag: string
    description: string
}

class RegisterCategoryService {
    async execute({name, tag, description,id_author}: IRegisterCategoryService){
        
        const categoryExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })
        
        if(categoryExists){
            return {
                message: "Não foi possivel cadastrar,essa categoria já existe !",
                status: 400,
            }
        }

        await prismaClient.category.create({
            data: {
                id_author: id_author,
                name: name,
                tag: tag,
                description: description
            },
            select: {
                id: true,
                name: true,
                tag: true,
                id_author: true,
                status: true,
                description: true,
                created_At: true
            }
        })

        return {
            message: "Categoria cadastrada com sucesso",
            status: 201
        }
    }
}

export {RegisterCategoryService}