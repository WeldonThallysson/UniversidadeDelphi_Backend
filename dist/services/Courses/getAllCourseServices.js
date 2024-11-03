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
exports.GetAllCourseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAllCourseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ category_id, name, id_author, page, limit }) {
            const skip = (page - 1) * limit; // Calcula quantos itens serão pulados
            const whereClause = Object.assign(Object.assign(Object.assign({}, (name && { name: { contains: name, mode: 'insensitive' } })), (category_id && { category_id })), (id_author && { id_author }));
            // Busca com filtros, paginação e contagem total
            const courses = yield prisma_1.default.courses.findMany({
                where: whereClause,
                skip,
                take: limit,
                select: {
                    id: true,
                    id_author: true,
                    category_id: true,
                    name: true,
                    description: true,
                    class: true,
                    data: true,
                    urlImage: true,
                    status: true,
                    created_At: true,
                },
            });
            const totalCourses = yield prisma_1.default.courses.count({
                where: whereClause,
            });
            return {
                data: {
                    items: courses,
                    total: totalCourses,
                    page,
                    limit,
                    totalPages: Math.ceil(totalCourses / limit), // Total de páginas
                    status: 200,
                }
            };
        });
    }
}
exports.GetAllCourseService = GetAllCourseService;
//# sourceMappingURL=getAllCourseServices.js.map