import prismaClient from "../../prisma"


interface IDeleteCategoryService {
    id: string
     
}

class DeleteCategoryService {
    async execute({id}: IDeleteCategoryService){
        
        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: id
            }
        })
        
        if(!categoryExists){
            throw new Error("Essa categoria não existe!")
        }

        await prismaClient.category.delete({
            where:{
                id: id
            },
            select: {
                id: true,
                name: true,
                tag: true,
                description: true,
                created_At: true
            }
        })  

        return {
            message: "Categoria deletada com sucesso",
            status: 200
        }
    }
}

export {DeleteCategoryService}