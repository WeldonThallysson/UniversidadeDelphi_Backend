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
exports.GetAllCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAllCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, tag, description, page, limit }) {
            const skip = (page - 1) * limit;
            const whereClause = Object.assign(Object.assign(Object.assign({}, (name && { name: { contains: name, mode: "insensitive" } })), (tag && { tag: { contains: tag, mode: "insensitive" } })), (description && { description: { contains: description, mode: "insensitive" } }));
            // Busca com paginação e filtros (se fornecidos)
            const categories = yield prisma_1.default.category.findMany({
                where: whereClause,
                skip,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    tag: true,
                    status: true,
                    description: true,
                    created_At: true,
                    id_author: true,
                    users: true,
                },
            });
            // Contagem total de categorias (para saber quantas páginas existem)
            const totalCategories = yield prisma_1.default.category.count({
                where: whereClause,
            });
            return {
                data: {
                    items: categories,
                    total: totalCategories,
                    totalPages: Math.ceil(totalCategories / limit),
                    page,
                    limit,
                },
                status: 200,
            };
        });
    }
}
exports.GetAllCategoryService = GetAllCategoryService;
//# sourceMappingURL=getAllCategoryService.js.map