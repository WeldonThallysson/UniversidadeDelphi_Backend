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
exports.GetAllLiveService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAllLiveService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, id_category, tag, data, tutor, page = 1, // Valor padrão para page
        limit, // Se undefined, buscará todos os registros
         }) {
            const skip = limit ? (page - 1) * limit : undefined; // Pula itens apenas se `limit` estiver definido
            // Cláusula de filtro dinâmico
            const whereClause = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name: { contains: name, mode: 'insensitive' } })), (id_category && { id_category })), (tag && { tag: { contains: tag, mode: 'insensitive' } })), (data && { data: { contains: data, mode: 'insensitive' } })), (tutor && { tutor: { contains: tutor, mode: 'insensitive' } }));
            // Busca com filtros e paginação condicional
            const lives = yield prisma_1.default.lives.findMany({
                where: whereClause,
                skip,
                take: limit || undefined, // Se `limit` for undefined, retorna todos os registros
                select: {
                    id: true,
                    id_author: true,
                    id_category: true,
                    idURLVideo: true,
                    name: true,
                    description: true,
                    data: true,
                    tag: true,
                    tutor: true,
                    urlVideo: true,
                    urlImage: true,
                    status: true,
                    created_At: true,
                },
            });
            // Contagem total para paginação
            const totalLives = yield prisma_1.default.lives.count({
                where: whereClause,
            });
            return {
                data: {
                    items: lives,
                    total: totalLives,
                    page,
                    limit: limit || totalLives, // Define `limit` como o total se não for fornecido
                    totalPages: limit ? Math.ceil(totalLives / limit) : 1, // Calcula total de páginas ou 1 se `limit` não for definido
                },
                status: 200,
            };
        });
    }
}
exports.GetAllLiveService = GetAllLiveService;
//# sourceMappingURL=getAllLiveService.js.map