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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCourseController = void 0;
const getAllCourseServices_1 = require("../../services/Courses/getAllCourseServices");
class GetAllCourseController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.query.name;
            const category_id = req.query.category_id;
            const page = req.query.page;
            const limit = req.query.limit;
            const getAllCourse = new getAllCourseServices_1.GetAllCourseService();
            const responseGetAllCourseCourse = yield getAllCourse.execute({
                category_id,
                name,
                page: Number(page) ? Number(page) : 1,
                limit: Number(limit) ? Number(limit) : 10,
            });
            return res.status(responseGetAllCourseCourse.status).json(responseGetAllCourseCourse.data);
        });
    }
}
exports.GetAllCourseController = GetAllCourseController;
//# sourceMappingURL=getAllCourseController.js.map