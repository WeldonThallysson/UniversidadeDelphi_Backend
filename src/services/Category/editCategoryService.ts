import prismaClient from "../../prisma"


interface IEditCategoryService {
    id: string
    name: string
    tag: string
    description: string
    status?: boolean
}

class EditCategoryService {
    async execute({id, name, tag, description,status}: IEditCategoryService){
       if(!id){
        return {
            message: "Para realizar essa ação, preencha o campo (id)",
            status: 400,
        }
       }

       if(name === '' && tag === "" && description === ""){
        return {
            message: "Para realizar essa ação, preencha os campos (nome, tag, descrição)",
            status: 400,
        }
       }

       const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: id
            }
       })
        
        if(!categoryExists){
            return {
                message: "Não foi possivel editar, essa categoria não existe !",
                status: 400,
            }
          
        }

        await prismaClient.category.update({
            where: {
                id: id
            },
            data: {
                name: name,
                tag: tag,
                description: description,
                status: status 
            }, select: {
                id: true,
                name: true,
                tag: true,
                status: true,
                description: true,
                created_At: true
            }
        })

        return {
            message: "Categoria editada realizada com sucesso",
            status: 200,
        }
    }
}

export {EditCategoryService}