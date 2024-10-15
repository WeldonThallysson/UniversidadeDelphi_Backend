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
exports.GetAllCourseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAllCourseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ category_id, name, id_author }) {
            if (name || category_id || id_author) {
                const getAllCourseFiltered = yield prisma_1.default.courses.findMany({
                    where: {
                        name: name,
                        category_id: category_id,
                        id_author: id_author
                    },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        class: true,
                        data: true,
                        category_id: true,
                        id_author: true,
                        urlImage: true,
                        status: true,
                        created_At: true,
                    },
                });
                return {
                    data: getAllCourseFiltered,
                    status: 200,
                };
            }
            else {
                const getAllCourse = yield prisma_1.default.courses.findMany({
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        class: true,
                        data: true,
                        category_id: true,
                        id_author: true,
                        urlImage: true,
                        status: true,
                        created_At: true,
                    },
                });
                return {
                    data: getAllCourse,
                    status: 200,
                };
            }
        });
    }
}
exports.GetAllCourseService = GetAllCourseService;
//# sourceMappingURL=getAllCourseServices.js.map