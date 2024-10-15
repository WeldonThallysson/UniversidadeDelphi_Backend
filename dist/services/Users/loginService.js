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
exports.LoginUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class LoginUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    email,
                },
            });
            if (!userExists) {
                return {
                    message: "Este email não existe",
                    status: 400,
                };
            }
            const verifyPasswordHash = yield (0, bcryptjs_1.compare)(password, userExists.password);
            if (!verifyPasswordHash) {
                return {
                    message: "Credenciais email ou senha incorretas.",
                    status: 400,
                };
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: userExists.name,
                password: userExists.password,
            }, process.env.JWT_SECRET, {
                subject: userExists === null || userExists === void 0 ? void 0 : userExists.id,
                expiresIn: "30d",
            });
            return {
                data: {
                    id: userExists.id,
                    email: userExists.email,
                    token: token,
                },
                status: 200,
            };
        });
    }
}
exports.LoginUserService = LoginUserService;
//# sourceMappingURL=loginService.js.map