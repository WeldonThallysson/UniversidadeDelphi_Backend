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
exports.GetDetailsCourseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetDetailsCourseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const courseExists = yield prisma_1.default.courses.findFirst({
                where: {
                    id: id,
                },
            });
            if (!courseExists) {
                return {
                    message: "Esse curso não existe!",
                    status: 400,
                };
            }
            const getDetailsCourse = yield prisma_1.default.courses.findFirst({
                select: {
                    id: true,
                    id_author: true,
                    category_id: true,
                    name: true,
                    description: true,
                    class: true,
                    data: true,
                    urlImage: true,
                    status: true,
                    created_At: true
                }
            });
            return {
                data: getDetailsCourse,
                status: 200
            };
        });
    }
}
exports.GetDetailsCourseService = GetDetailsCourseService;
//# sourceMappingURL=getDetailsCourseServices.js.map