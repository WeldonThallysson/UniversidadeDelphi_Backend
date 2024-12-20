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
exports.GetDetailsUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetDetailsUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    id: id
                },
            });
            if (!userExists) {
                return {
                    message: "Esse usuário não existe!",
                    status: 400,
                };
            }
            const author = yield prisma_1.default.users.findFirst({
                where: {
                    id_author: userExists.id_author
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            const users = yield prisma_1.default.users.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    id_author: true,
                    name: true,
                    email: true,
                    status: true,
                    masterAccess: true,
                    category: true,
                    courses: true,
                    class: true,
                    lives: true,
                    created_At: true,
                },
            });
            const dataItem = {
                items: Object.assign(Object.assign({}, users), { author: author }),
            };
            return {
                data: dataItem,
                status: 200
            };
        });
    }
}
exports.GetDetailsUserService = GetDetailsUserService;
//# sourceMappingURL=getUserDetailsService.js.map