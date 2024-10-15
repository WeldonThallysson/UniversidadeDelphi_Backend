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
exports.RegisterCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RegisterCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, tag, description, id_author }) {
            const categoryExists = yield prisma_1.default.category.findFirst({
                where: {
                    name: name
                }
            });
            if (categoryExists) {
                return {
                    message: "Não foi possivel cadastrar,essa categoria já existe !",
                    status: 400,
                };
            }
            yield prisma_1.default.category.create({
                data: {
                    id_author: id_author,
                    name: name,
                    tag: tag,
                    description: description
                },
                select: {
                    id: true,
                    name: true,
                    tag: true,
                    id_author: true,
                    status: true,
                    description: true,
                    created_At: true
                }
            });
            return {
                message: "Categoria cadastrada com sucesso",
                status: 201
            };
        });
    }
}
exports.RegisterCategoryService = RegisterCategoryService;
//# sourceMappingURL=registerCategoryService.js.map