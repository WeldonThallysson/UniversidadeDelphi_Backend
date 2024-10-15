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
exports.GetAllUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAllUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email }) {
            const userExists = yield prisma_1.default.users.findFirst({
                where: {
                    name: name,
                    email: email,
                },
            });
            if (!userExists) {
                return {
                    message: "Esse usuário não existe!",
                    status: 400,
                };
            }
            const users = yield prisma_1.default.users.findMany({
                where: {
                    name: name,
                    email: email,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    status: true,
                    masterAccess: true,
                    created_At: true,
                },
            });
            return {
                data: users,
                status: 200,
            };
        });
    }
}
exports.GetAllUserService = GetAllUserService;
//# sourceMappingURL=getAllUsersSevice.js.map