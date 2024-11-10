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
exports.GetAllClassService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAllClassService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, id_category, id_course, tag, data, tutor, page, limit, }) {
            const skip = limit ? (page - 1) * limit : undefined; // Pula itens apenas se `limit` estiver definido
            // Ajuste dos filtros dinâmicos usando a tipagem correta do Prisma
            const whereClause = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name: { contains: name, mode: 'insensitive' } })), (id_category && { id_category })), (id_course && { id_course })), (tag && { tag: { contains: tag, mode: 'insensitive' } })), (data && { data: { contains: data, mode: 'insensitive' } })), (tutor && { tutor: { contains: tutor, mode: 'insensitive' } }));
            // Busca com filtros, paginação condicional e ordenação pelo campo `order`
            const classes = yield prisma_1.default.class.findMany({
                where: whereClause,
                skip,
                take: limit || undefined, // Se `limit` for undefined, retorna todos os registros
                orderBy: { order: 'asc' }, // Ordena por `order` em ordem crescente
                select: {
                    id: true,
                    id_author: true,
                    idURLVideo: true,
                    id_course: true,
                    id_category: true,
                    name: true,
                    description: true,
                    data: true,
                    tag: true,
                    tutor: true,
                    urlVideo: true,
                    urlImage: true,
                    order: true, // Inclui o campo `order` no retorno
                    status: true,
                    category: true,
                    courses: true,
                    created_At: true,
                },
            });
            // Contagem total para paginação
            const totalClasses = yield prisma_1.default.class.count({
                where: whereClause,
            });
            return {
                data: {
                    items: classes,
                    total: totalClasses,
                    page: page || 1, // Define `page` como 1 se não for fornecido
                    limit: limit || totalClasses, // Define `limit` como o total se não for fornecido
                    totalPages: limit ? Math.ceil(totalClasses / limit) : 1, // Calcula total de páginas ou 1 se `limit` não for definido
                },
                status: 200,
            };
        });
    }
}
exports.GetAllClassService = GetAllClassService;
//# sourceMappingURL=getAllClassService.js.map