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
exports.EditUsersService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class EditUsersService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, name, email, masterAccess, password, status }) {
            if (!id) {
                return {
                    message: "Para realizar essa ação, preencha o campo (id)",
                    status: 400,
                };
            }
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    id: id,
                },
            });
            /*
             if (name === "" || email === "") {
              return {
                message: "Informe os dados obrigatórios (nome,email)",
                status: 400,
              }
            }
        
        
        
            if (nameExists) {
              return {
                message: "Esse email já existe, para editar o usuário tente outro email!",
                status: 400,
              }
            }
            */
            let passwordHash;
            if (password) {
                passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            }
            yield prisma_1.default.users.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    email: email,
                    masterAccess: masterAccess,
                    password: passwordHash || userExists.password,
                    status: status,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    masterAccess: true,
                    status: true,
                    created_At: true,
                },
            });
            return {
                message: 'Usuário editado com sucesso!',
                status: 200,
            };
            ;
        });
    }
}
exports.EditUsersService = EditUsersService;
//# sourceMappingURL=editUserService.js.map