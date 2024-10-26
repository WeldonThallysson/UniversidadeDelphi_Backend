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
exports.GetAllLiveController = void 0;
const getAllLiveService_1 = require("../../services/Lives/getAllLiveService");
class GetAllLiveController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.query.name;
            const id_category = req.query.id_category;
            const id_course = req.query.id_course;
            const tag = req.query.tag;
            const data = req.query.data;
            const tutor = req.query.tutor;
            const page = req.query.page;
            const limit = req.query.limit;
            const getAllLive = new getAllLiveService_1.GetAllLiveService();
            const responseGetAllLive = yield getAllLive.execute({
                name,
                id_category,
                tag,
                data,
                tutor,
                page: Number(page) ? Number(page) : 1,
                limit: Number(limit) ? Number(limit) : 10,
            });
            return res.status(responseGetAllLive.status).json(responseGetAllLive.data);
        });
    }
}
exports.GetAllLiveController = GetAllLiveController;
//# sourceMappingURL=getAllLiveController.js.map