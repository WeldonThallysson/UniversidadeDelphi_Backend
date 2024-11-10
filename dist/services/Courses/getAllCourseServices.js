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
            // Define o número de itens a serem pulados apenas se `limit` for definido
            const skip = limit ? (page - 1) * limit : undefined;
            const whereClause = Object.assign(Object.assign(Object.assign({}, (name && { name: { contains: name, mode: 'insensitive' } })), (category_id && { category_id })), (id_author && { id_author }));
            // Configura a query para buscar todos os itens se `limit` não for definido
            const courses = yield prisma_1.default.courses.findMany({
                where: whereClause,
                skip,
                take: limit || undefined, // Se `limit` for `undefined`, retorna todos
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
                    category: true,
                    users: true,
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
                    limit: limit || totalCourses, // Define `limit` como o total de cursos se não for fornecido
                    totalPages: limit ? Math.ceil(totalCourses / limit) : 1, // Calcula o total de páginas ou define como 1 se `limit` não for fornecido
                    status: 200,
                }
            };
        });
    }
}
exports.GetAllCourseService = GetAllCourseService;
//# sourceMappingURL=getAllCourseServices.js.map