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
exports.RegisterUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class RegisterUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, id_author, email, password }) {
            if (name === "" && email === "" && password === "") {
                return {
                    message: "Verifique e preencha os campos nome, email, senha.",
                    status: 400,
                };
            }
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    email: email,
                },
            });
            if (userExists) {
                return {
                    message: "Esse email já está cadastrado, tente novamente.",
                    status: 400,
                };
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            yield prisma_1.default.users.create({
                data: {
                    name: name,
                    email: email,
                    id_author: id_author ? id_author : "",
                    password: passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_At: true,
                },
            });
            return {
                message: "Cadastro realizado com sucesso!",
                status: 201,
            };
        });
    }
}
exports.RegisterUserService = RegisterUserService;
//# sourceMappingURL=registerUserService.js.map