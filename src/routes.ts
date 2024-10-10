import { Router,Response,Request } from "express";


const router = Router()


router.get('/', (req: Request,res:Response) => {
    return res.status(200).json({
        message: 'API Online'
    })
})

// rotas para o login e cadastro do usuario, get de todos usuários cadastrados e get de detalhes de 1 usuário
router.post('/signin',) // endpoint para login
router.post('/signup') // endpoint para cadastrar uma conta
router.get('/users') // endpoint para dar get de usuários se tiver o masterAccess true
router.get('/users/:id') // endpoint para dar get em detalhe da minha conta sem necessidade de master access true
router.put('/users')
router.delete("/users/:id")
// rotas para cadastrar uma categoria 
router.post('/category') // endpoint para cadastrar categoria se estiver logado MasterAcesss true
router.put('/category') // endpoint para editar categoria se estiver logado MasterAcesss true
router.delete('/category') // endpoint para deletar uma categoria se tiver logado MasterAcesss true
router.get('/category') // endpoint para buscar as categorias sem precisar estar logado pois o front irá fazer esse get com os filtros 
router.get('/category/:id') // endpoint para buscar as categorias sem precisar estar logado pois o front irá fazer esse get com os filtros

//endpoints para cadastrar cursos 
router.get('/courses') //endpoint para buscar todos os cursos com filtros sem precisar estar logado
router.get('/courses/:id') // endpoint para buscar o curso pelo id, sem precisar estar logado 
router.post('/courses') //endpoint para cadastrar um novo curso, passando o id da categoria e o id do author que está cadastrando se estiver logado com masterAccess True 
router.put('/courses') //endpoint para editar o curso cadastrado  se estiver logado com masterAccess True .
router.delete('/courses') // endpoint para deletar curso cadastrado  se estiver logado com masterAccess True 

//endpoints para cadastrar as aulas
router.get('/class') // endpoint para buscar todas as aulas com filtro para id_category e id_course sem precisar estar logado 
router.get('/class/:id') // endpoint para buscar os detalhes da aula sem precisar estar logado
router.post('/class') //enpoint para cadastra a aula com o id_course se tiver, pode ir em branco, id_category obrigatorio e id_author que é o id do usuário logado isso já vai daqui da api masterAcesss true 
router.put('/class') // endpoint para editar a aula podendo alterar ao id_category e o id_course, se o usuário estiver logado já passa o id dele como id_author masterAcesss true
router.delete('/class') //endpoint para deletar aula se estiver logado e com o masterAcesss true

export {router}