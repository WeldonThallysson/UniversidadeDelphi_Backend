import { Router,Response,Request } from "express";
import { RegisterUserController } from "./controllers/Users/registerUserController";
import { LoginUserController } from "./controllers/Users/loginController";
import { isLogged } from "./middlewares/isLogged"; 
import { GetDetailsUsersController } from "./controllers/Users/getUserDetailsController";
import { GetAllUsersController } from "./controllers/Users/getAllUsersController";
import { EditUsersController } from "./controllers/Users/editUserController";
import { DeleteUsersController } from "./controllers/Users/deleteUsersController";
import { RegisterCategoryController } from "./controllers/Category/registerCategoryController";
import { EditCategoryController } from "./controllers/Category/editCategoryController";
import { DeleteCategoryController } from "./controllers/Category/deleteCategoryController";
import { GetAllCategoryController } from "./controllers/Category/getAllCategoryController";
import { GetDetailsCategoryController } from "./controllers/Category/getDetailsCategoryController";
import { RegisterCourseController } from "./controllers/Courses/registerCourseController";
import { GetAllCourseController } from "./controllers/Courses/getAllCourseController";
import { GetDetailsCourseController } from "./controllers/Courses/getDetailsCourseController";
import { EditCourseController } from "./controllers/Courses/editCourseController";
import { DeleteCourseController } from "./controllers/Courses/deleteCourseController";
import { DeleteClassController } from "./controllers/Class/deleteClassController";
import { EditClassController } from "./controllers/Class/editClassController";
import { RegisterClassController } from "./controllers/Class/registerClassController";
import { GetDetailsClassController } from "./controllers/Class/getDetailsClassController";
import { GetAllClassController } from "./controllers/Class/getAllClassController";


const router = Router()


router.get('/', (_,res:Response) => {
    return res.status(200).json({
        message: 'API Online'
    })
})

// rotas para o login e cadastro do usuario, get de todos usuários cadastrados e get de detalhes de 1 usuário
router.post('/login', new LoginUserController().handle) // endpoint para login
router.post('/register', new RegisterUserController().handle) // endpoint para cadastrar uma conta
router.get('/users', isLogged, new GetAllUsersController().handle) // endpoint para dar get de usuários se tiver o masterAccess true
router.get('/users/:id',isLogged, new GetDetailsUsersController().handle) // endpoint para dar get em detalhe da minha conta sem necessidade de master access true
router.put('/users', isLogged, new EditUsersController().handle)
router.delete("/users/:id", isLogged, new DeleteUsersController().handle )


// rotas para cadastrar uma categoria 
router.get('/category', new GetAllCategoryController().handle) // endpoint para buscar as categorias sem precisar estar logado pois o front irá fazer esse get com os filtros 
router.get('/category/:id', new GetDetailsCategoryController().handle ) // endpoint para buscar as categorias sem precisar estar logado pois o front irá fazer esse get com os filtros
router.post('/category', isLogged, new RegisterCategoryController().handle) // endpoint para cadastrar categoria se estiver logado MasterAcesss true
router.put('/category', isLogged, new EditCategoryController().handle) // endpoint para editar categoria se estiver logado MasterAcesss true
router.delete('/category/:id',isLogged, new DeleteCategoryController().handle) // endpoint para deletar uma categoria se tiver logado MasterAcesss true

//endpoints para cadastrar cursos 
router.get('/courses', new GetAllCourseController().handle) //endpoint para buscar todos os cursos com filtros sem precisar estar logado
router.get('/courses/:id',  new GetDetailsCourseController().handle) // endpoint para buscar o curso pelo id, sem precisar estar logado 
router.post('/courses',isLogged, new RegisterCourseController().handle) //endpoint para cadastrar um novo curso, passando o id da categoria e o id do author que está cadastrando se estiver logado com masterAccess True 
router.put('/courses',isLogged, new EditCourseController().handle) //endpoint para editar o curso cadastrado  se estiver logado com masterAccess True .
router.delete('/courses/:id',isLogged, new DeleteCourseController().handle) // endpoint para deletar curso cadastrado  se estiver logado com masterAccess True 

//endpoints para cadastrar as aulas
router.get('/class', new GetAllClassController().handle) // endpoint para buscar todas as aulas com filtro para id_category e id_course sem precisar estar logado 
router.get('/class/:id', new GetDetailsClassController().handle) // endpoint para buscar os detalhes da aula sem precisar estar logado
router.post('/class', isLogged, new RegisterClassController().handle) //enpoint para cadastra a aula com o id_course se tiver, pode ir em branco, id_category obrigatorio e id_author que é o id do usuário logado isso já vai daqui da api masterAcesss true 
router.put('/class', isLogged, new EditClassController().handle) // endpoint para editar a aula podendo alterar ao id_category e o id_course, se o usuário estiver logado já passa o id dele como id_author masterAcesss true
router.delete('/class/:id', isLogged, new DeleteClassController().handle) //endpoint para deletar aula se estiver logado e com o masterAcesss true

export {router}