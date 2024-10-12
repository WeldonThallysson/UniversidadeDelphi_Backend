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
   
       if(name === '' && tag === "" && description === ""){
          throw new Error('Para realizar essa ação, preencha os campos (nome, tag, description')
       }

       const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: id
            }
       })
        
        if(!categoryExists){
            throw new Error("Não foi possivel editar, essa categoria não existe !")
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