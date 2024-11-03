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
exports.EditCourseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class EditCourseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, category_id, name, description, urlImage, data, status }) {
            if (name === "" && description === "") {
                return {
                    message: "Preencha os campos (nome, descrição)!",
                    status: 400,
                };
            }
            if (category_id === "") {
                return {
                    message: "Selecione a categoria do curso!",
                    status: 400,
                };
            }
            if (!id) {
                return {
                    message: "Para realizar essa ação, preencha o campo (id)",
                    status: 400,
                };
            }
            const courseExists = yield prisma_1.default.courses.findFirst({
                where: {
                    id: id,
                },
            });
            if (!courseExists) {
                return {
                    message: "Não foi possivel editar,esse curso não existe !",
                    status: 400,
                };
            }
            yield prisma_1.default.courses.update({
                where: {
                    id: id,
                },
                data: {
                    name,
                    description,
                    urlImage,
                    category_id,
                    data: data,
                    status: status === 'true' ? true : false
                },
            });
            return {
                message: "Curso editado com sucesso!",
                status: 200,
            };
        });
    }
}
exports.EditCourseService = EditCourseService;
//# sourceMappingURL=editCourseService.js.map