import prismaClient from "../../prisma"


interface IGetAllCategoryService {
    name?: string
    tag?: string
    description?: string
}

class GetAllCategoryService {
    async execute({name, tag, description}: IGetAllCategoryService){
        
   
        if(name){
            const getAllCategory = await prismaClient.category.findMany({
                ...(name && {
                    where: {
                        name: name,
                        tag: tag,
                        description: description
                    },
                    select: {
                        id: true,
                        name: true,
                        tag: true,
                        status: true,
                        description: true,
                        created_At: true
                    }
                })
            })
    
            return getAllCategory
        } 
        else {
            const getAllCategory = await prismaClient.category.findMany()
    
            return getAllCategory
        }
       
    }
}

export {GetAllCategoryService}