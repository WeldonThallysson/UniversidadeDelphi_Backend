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
exports.GetAllClassService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAllClassService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, id_category, id_course, tag, data, tutor, }) {
            if (name || id_category || tag || data || tutor || id_course) {
                const getAllCourseFiltered = yield prisma_1.default.class.findMany({
                    where: {
                        name: name,
                        id_category: id_category,
                        tag: tag,
                        data: data,
                        tutor: tutor,
                        id_course: id_course,
                    },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        data: true,
                        tag: true,
                        tutor: true,
                        urlVideo: true,
                        urlImage: true,
                        id_author: true,
                        idURLVideo: true,
                        id_course: true,
                        id_category: true,
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
                const getAllCourse = yield prisma_1.default.class.findMany({
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        data: true,
                        tag: true,
                        tutor: true,
                        urlVideo: true,
                        urlImage: true,
                        id_author: true,
                        idURLVideo: true,
                        id_course: true,
                        id_category: true,
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
exports.GetAllClassService = GetAllClassService;
//# sourceMappingURL=getAllClassService.js.map