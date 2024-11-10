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
exports.GetDetailsLiveService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetDetailsLiveService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const classExists = yield prisma_1.default.lives.findFirst({
                where: {
                    id: id,
                },
            });
            if (!classExists) {
                return {
                    data: {
                        message: "Essa live não existe!",
                    },
                    status: 400,
                };
            }
            const getDetailsClass = yield prisma_1.default.lives.findFirst({
                where: {
                    id
                },
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
                    category: true,
                    order: true,
                    users: true,
                    created_At: true,
                }
            });
            return {
                data: getDetailsClass,
                status: 200,
            };
        });
    }
}
exports.GetDetailsLiveService = GetDetailsLiveService;
//# sourceMappingURL=getDetailsLiveService.js.map