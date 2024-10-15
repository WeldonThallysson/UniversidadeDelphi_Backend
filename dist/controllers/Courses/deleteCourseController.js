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
exports.DeleteCourseController = void 0;
const deleteCourseService_1 = require("../../services/Courses/deleteCourseService");
class DeleteCourseController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteCourse = new deleteCourseService_1.DeleteCourseService();
            const responseDeleteCourse = yield deleteCourse.execute({ id });
            return res.status(responseDeleteCourse.status).json(responseDeleteCourse);
        });
    }
}
exports.DeleteCourseController = DeleteCourseController;
//# sourceMappingURL=deleteCourseController.js.map