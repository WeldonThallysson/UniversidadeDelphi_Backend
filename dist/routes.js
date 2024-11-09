"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const registerUserController_1 = require("./controllers/Users/registerUserController");
const loginController_1 = require("./controllers/Users/loginController");
const isLogged_1 = require("./middlewares/isLogged");
const getUserDetailsController_1 = require("./controllers/Users/getUserDetailsController");
const getAllUsersController_1 = require("./controllers/Users/getAllUsersController");
const editUserController_1 = require("./controllers/Users/editUserController");
const deleteUsersController_1 = require("./controllers/Users/deleteUsersController");
const registerCategoryController_1 = require("./controllers/Category/registerCategoryController");
const editCategoryController_1 = require("./controllers/Category/editCategoryController");
const deleteCategoryController_1 = require("./controllers/Category/deleteCategoryController");
const getAllCategoryController_1 = require("./controllers/Category/getAllCategoryController");
const getDetailsCategoryController_1 = require("./controllers/Category/getDetailsCategoryController");
const registerCourseController_1 = require("./controllers/Courses/registerCourseController");
const getAllCourseController_1 = require("./controllers/Courses/getAllCourseController");
const getDetailsCourseController_1 = require("./controllers/Courses/getDetailsCourseController");
const editCourseController_1 = require("./controllers/Courses/editCourseController");
const deleteCourseController_1 = require("./controllers/Courses/deleteCourseController");
const deleteClassController_1 = require("./controllers/Class/deleteClassController");
const editClassController_1 = require("./controllers/Class/editClassController");
const registerClassController_1 = require("./controllers/Class/registerClassController");
const getDetailsClassController_1 = require("./controllers/Class/getDetailsClassController");
const getAllClassController_1 = require("./controllers/Class/getAllClassController");
const getAllLiveController_1 = require("./controllers/Lives/getAllLiveController");
const getDetailsLiveController_1 = require("./controllers/Lives/getDetailsLiveController");
const registerLiveController_1 = require("./controllers/Lives/registerLiveController");
const editLiveController_1 = require("./controllers/Lives/editLiveController");
const deleteLiveController_1 = require("./controllers/Lives/deleteLiveController");
const recoverPasswordUserController_1 = require("./controllers/Users/PasswordRecover/recoverPasswordUserController");
const redefinePasswordUserController_1 = require("./controllers/Users/PasswordRecover/redefinePasswordUserController");
const allowAccessUserController_1 = require("./controllers/Users/Permissions/allowAccessUserController");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (_, res) => {
    return res.status(200).json({
        message: 'API Online'
    });
});
// rotas para o login e cadastro do usuario, get de todos usuários cadastrados e get de detalhes de 1 usuário
router.post('/login', new loginController_1.LoginUserController().handle); // endpoint para login
router.post('/register', new registerUserController_1.RegisterUserController().handle); // endpoint para cadastrar uma conta
router.post("/auth/recoverpassword", new recoverPasswordUserController_1.RecoverPasswordController().handle); // endpoint para requerir a recuperação de senha com email
router.post("/auth/redefinepassword", new redefinePasswordUserController_1.RedefinePasswordController().handle); // endpoint para redefinir a senha com token gerado pelo sistema.
router.post("/auth/permissions", new allowAccessUserController_1.AllowAccessUserController().handle); // endpoint para redefinir a senha com token gerado pelo sistema.
router.get('/users', isLogged_1.isLogged, new getAllUsersController_1.GetAllUsersController().handle); // endpoint para dar get de usuários se tiver o masterAccess true
router.get('/users/:id', isLogged_1.isLogged, new getUserDetailsController_1.GetDetailsUsersController().handle); // endpoint para dar get em detalhe da minha conta sem necessidade de master access true
router.put('/users', isLogged_1.isLogged, new editUserController_1.EditUsersController().handle);
router.delete("/users/:id", isLogged_1.isLogged, new deleteUsersController_1.DeleteUsersController().handle);
// rotas para cadastrar uma categoria 
router.get('/category', new getAllCategoryController_1.GetAllCategoryController().handle); // endpoint para buscar as categorias sem precisar estar logado pois o front irá fazer esse get com os filtros 
router.get('/category/:id', new getDetailsCategoryController_1.GetDetailsCategoryController().handle); // endpoint para buscar as categorias sem precisar estar logado pois o front irá fazer esse get com os filtros
router.post('/category', isLogged_1.isLogged, new registerCategoryController_1.RegisterCategoryController().handle); // endpoint para cadastrar categoria se estiver logado MasterAcesss true
router.put('/category', isLogged_1.isLogged, new editCategoryController_1.EditCategoryController().handle); // endpoint para editar categoria se estiver logado MasterAcesss true
router.delete('/category/:id', isLogged_1.isLogged, new deleteCategoryController_1.DeleteCategoryController().handle); // endpoint para deletar uma categoria se tiver logado MasterAcesss true
//endpoints para cadastrar cursos 
router.get('/courses', new getAllCourseController_1.GetAllCourseController().handle); //endpoint para buscar todos os cursos com filtros sem precisar estar logado
router.get('/courses/:id', new getDetailsCourseController_1.GetDetailsCourseController().handle); // endpoint para buscar o curso pelo id, sem precisar estar logado 
router.post('/courses', isLogged_1.isLogged, new registerCourseController_1.RegisterCourseController().handle); //endpoint para cadastrar um novo curso, passando o id da categoria e o id do author que está cadastrando se estiver logado com masterAccess True 
router.put('/courses', isLogged_1.isLogged, new editCourseController_1.EditCourseController().handle); //endpoint para editar o curso cadastrado  se estiver logado com masterAccess True .
router.delete('/courses/:id', isLogged_1.isLogged, new deleteCourseController_1.DeleteCourseController().handle); // endpoint para deletar curso cadastrado  se estiver logado com masterAccess True 
//endpoints para cadastrar as aulas
router.get('/class', new getAllClassController_1.GetAllClassController().handle); // endpoint para buscar todas as aulas com filtro para id_category e id_course sem precisar estar logado 
router.get('/class/:id', new getDetailsClassController_1.GetDetailsClassController().handle); // endpoint para buscar os detalhes da aula sem precisar estar logado
router.post('/class', isLogged_1.isLogged, new registerClassController_1.RegisterClassController().handle); //enpoint para cadastra a aula com o id_course se tiver, pode ir em branco, id_category obrigatorio e id_author que é o id do usuário logado isso já vai daqui da api masterAcesss true 
router.put('/class', isLogged_1.isLogged, new editClassController_1.EditClassController().handle); // endpoint para editar a aula podendo alterar ao id_category e o id_course, se o usuário estiver logado já passa o id dele como id_author masterAcesss true
router.delete('/class/:id', isLogged_1.isLogged, new deleteClassController_1.DeleteClassController().handle); //endpoint para deletar aula se estiver logado e com o masterAcesss true
router.get('/live', new getAllLiveController_1.GetAllLiveController().handle); // endpoint para buscar todas as aulas com filtro para id_category e id_course sem precisar estar logado 
router.get('/live/:id', new getDetailsLiveController_1.GetDetailsLiveController().handle); // endpoint para buscar os detalhes da aula sem precisar estar logado
router.post('/live', isLogged_1.isLogged, new registerLiveController_1.RegisterLiveController().handle); //enpoint para cadastra a aula com o id_course se tiver, pode ir em branco, id_category obrigatorio e id_author que é o id do usuário logado isso já vai daqui da api masterAcesss true 
router.put('/live', isLogged_1.isLogged, new editLiveController_1.EditLiveController().handle); // endpoint para editar a aula podendo alterar ao id_category e o id_course, se o usuário estiver logado já passa o id dele como id_author masterAcesss true
router.delete('/lives/:id', isLogged_1.isLogged, new deleteLiveController_1.DeleteLiveController().handle); //endpoint para deletar aula se estiver logado e com o masterAcesss true
//# sourceMappingURL=routes.js.map