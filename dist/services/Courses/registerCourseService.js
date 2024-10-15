"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCourseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RegisterCourseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id_author, data, category_id, name, description, urlImage }) {
            /*
              const courseExists = await prismaClient.courses.findFirst({
                 where: {
                    name: name
                 }
            })
    
            if(courseExists){
                return {
                    message: "Não foi possivel cadastrar, esse curso já existe, tente novamente outro nome!",
                    status: 400,
                }
            }
    
            
            */
            if (name === "" && description === "") {
                return {
                    message: "Preencha os campos (nome, descrição)!",
                    status: 400
                };
            }
            if (category_id === "") {
                return {
                    message: "Selecione a categoria do curso!",
                    status: 400
                };
            }
            yield prisma_1.default.courses.create({
                data: {
                    name,
                    description,
                    urlImage,
                    category_id,
                    data,
                    id_author: id_author
                },
            });
            return {
                message: "Curso cadastrado com sucesso!",
                status: 201
            };
        });
    }
}
exports.RegisterCourseService = RegisterCourseService;
//# sourceMappingURL=registerCourseService.js.map