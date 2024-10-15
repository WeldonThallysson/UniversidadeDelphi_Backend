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
exports.EditCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class EditCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, tag, description, status }) {
            if (!id) {
                return {
                    message: "Para realizar essa ação, preencha o campo (id)",
                    status: 400,
                };
            }
            if (name === '' && tag === "" && description === "") {
                return {
                    message: "Para realizar essa ação, preencha os campos (nome, tag, descrição)",
                    status: 400,
                };
            }
            const categoryExists = yield prisma_1.default.category.findFirst({
                where: {
                    id: id
                }
            });
            if (!categoryExists) {
                return {
                    message: "Não foi possivel editar, essa categoria não existe !",
                    status: 400,
                };
            }
            yield prisma_1.default.category.update({
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
            });
            return {
                message: "Categoria editada realizada com sucesso",
                status: 200,
            };
        });
    }
}
exports.EditCategoryService = EditCategoryService;
//# sourceMappingURL=editCategoryService.js.map