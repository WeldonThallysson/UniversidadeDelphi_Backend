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
exports.GetDetailsClassService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetDetailsClassService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const classExists = yield prisma_1.default.class.findFirst({
                where: {
                    id: id,
                },
            });
            if (!classExists) {
                return {
                    data: {
                        message: "Essa aula não existe!",
                    },
                    status: 400,
                };
            }
            const getDetailsClass = yield prisma_1.default.class.findFirst({
                where: {
                    id
                },
                select: {
                    id: true,
                    id_author: true,
                    idURLVideo: true,
                    id_course: true,
                    id_category: true,
                    name: true,
                    description: true,
                    data: true,
                    tag: true,
                    tutor: true,
                    urlVideo: true,
                    urlImage: true,
                    status: true,
                    category: true,
                    courses: true,
                    users: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            status: true,
                            id_author: true
                        }
                    },
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
exports.GetDetailsClassService = GetDetailsClassService;
//# sourceMappingURL=getDetailsClassService.js.map