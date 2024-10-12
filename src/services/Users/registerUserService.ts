import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface ISignUpService {
    name: string,
    email: string,
    password: string
}

class RegisterUserService {
    async execute({name,email,password}:ISignUpService){
        const userExists = await prismaClient.users.findFirst({
            where: {
                email: email
            }
        })
        if(userExists){
           throw new Error('Esse email já está cadastrado, tente novamente.')
        }

        if(name === "" && email === "" && password === ""){
            throw new Error('Verifique e preencha os campos nome, email, senha.') }   
        
        const passwordHash = await hash(password, 8)
         
         await prismaClient.users.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
                created_At: true
            }
         })

         return {
            message: "Cadastro realizado com sucesso!",
            status: 200
         }
    }
}


export {RegisterUserService}