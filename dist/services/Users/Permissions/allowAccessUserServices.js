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
exports.AllowAccessUserService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllowAccessUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email_user, id_user_logged, masterAccessParam, }) {
            if (!email_user) {
                return {
                    data: {
                        message: "Não foi possivel realizar esta ação, por favor envie o email_user do usuário.",
                        status: 400,
                    },
                };
            }
            if (masterAccessParam !== null) {
                return {
                    data: {
                        message: "Não foi possivel realizar esta ação, por favor envie o masterAccessParam do usuário.",
                        status: 400,
                    },
                };
            }
            const userLoggedExists = yield prisma_1.default.users.findFirst({
                where: {
                    id: id_user_logged,
                },
            });
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    email: email_user,
                },
            });
            if (!userLoggedExists) {
                return {
                    data: {
                        message: "Não foi possivel realizar esta ação, usuário responsavel não encontrado.",
                        status: 400,
                    },
                };
            }
            if (!userExists) {
                return {
                    data: {
                        message: "Não foi possivel realizar esta ação, usuário não encontrado.",
                        status: 400,
                    },
                };
            }
            if (!userLoggedExists.masterAccess) {
                return {
                    data: {
                        message: "Você não tem permissão de autorização para esta ação.",
                        status: 403,
                    },
                };
            }
            if (userExists.id === id_user_logged) {
                return {
                    data: {
                        message: "Não é possivel alterar o próprio tipo de acesso, para está ação entre em contato com o suporte",
                        status: 403,
                    },
                };
            }
            yield prisma_1.default.users.update({
                where: {
                    id: userExists.id,
                },
                data: {
                    masterAccess: masterAccessParam ? masterAccessParam : false
                },
            });
            return {
                data: {
                    message: "Permissão de autorizações alteradas com sucesso.",
                    status: 200,
                },
            };
        });
    }
}
exports.AllowAccessUserService = AllowAccessUserService;
//# sourceMappingURL=allowAccessUserServices.js.map