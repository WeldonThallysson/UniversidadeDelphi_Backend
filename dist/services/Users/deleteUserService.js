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
exports.DeleteUsersService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteUsersService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            if (!id) {
                return {
                    message: "Para realizar esta ação, informe o id usuário.",
                    status: 400,
                };
            }
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    id: id,
                }
            });
            if (!userExists) {
                return {
                    message: "Não foi possivel deletar,esse usuário não existe!",
                    status: 400,
                };
            }
            yield prisma_1.default.users.delete({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return {
                message: 'Usuário deletado com sucesso!',
                status: 200,
            };
        });
    }
}
exports.DeleteUsersService = DeleteUsersService;
//# sourceMappingURL=deleteUserService.js.map