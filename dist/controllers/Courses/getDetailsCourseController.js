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
exports.GetDetailsCourseController = void 0;
const getDetailsCourseServices_1 = require("../../services/Courses/getDetailsCourseServices");
class GetDetailsCourseController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detailsCourse = new getDetailsCourseServices_1.GetDetailsCourseService();
            const responseDetailsCourse = yield detailsCourse.execute({ id });
            return res.status(responseDetailsCourse.status).json(responseDetailsCourse.data);
        });
    }
}
exports.GetDetailsCourseController = GetDetailsCourseController;
//# sourceMappingURL=getDetailsCourseController.js.map