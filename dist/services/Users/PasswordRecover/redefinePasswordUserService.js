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
exports.RedefinePasswordService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class RedefinePasswordService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ tokenPassword, newPassword }) {
            if (!tokenPassword) {
                return {
                    data: {
                        message: "Por favor informe o token de recuperação de senha enviado no seu email",
                        status: 400,
                    },
                };
            }
            if (!newPassword) {
                return {
                    data: {
                        message: "Por favor informe sua nova senha para prosseguir.",
                        status: 400,
                    },
                };
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(tokenPassword, process.env.JWT_SECRET);
                const { userId } = decoded;
                const userExists = yield prisma_1.default.users.findFirst({
                    where: {
                        id: userId,
                    },
                });
                if (!userExists) {
                    return {
                        data: {
                            message: "Não foi possivel prosseguir com a ação, dados do token inválidos.",
                            status: 404,
                        },
                    };
                }
                const newPasswordHash = yield (0, bcryptjs_1.hash)(newPassword, 8);
                yield prisma_1.default.users.update({
                    where: {
                        id: userExists.id,
                    },
                    data: {
                        password: newPasswordHash,
                    },
                });
                return {
                    data: {
                        message: "Sua senha foi redefinida com sucesso",
                        status: 200,
                    },
                };
            }
            catch (err) {
                if (err.name === "TokenExpiredError") {
                    return {
                        data: {
                            message: "Link para redefinição de senha expirado (token).",
                            status: 401,
                        },
                    };
                }
                return {
                    data: {
                        message: "Erro ao redefinir senha",
                        status: 500,
                    },
                };
            }
        });
    }
}
exports.RedefinePasswordService = RedefinePasswordService;
//# sourceMappingURL=redefinePasswordUserService.js.map