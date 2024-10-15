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
exports.GetAllCategoryController = void 0;
const getAllCategoryService_1 = require("../../services/Category/getAllCategoryService");
class GetAllCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.query.name;
            const tag = req.query.tag;
            const description = req.query.description;
            const getAllCategory = new getAllCategoryService_1.GetAllCategoryService();
            const responseGetAllCategory = yield getAllCategory.execute({
                name,
                tag,
                description,
            });
            return res.status(responseGetAllCategory.status).json(responseGetAllCategory.data);
        });
    }
}
exports.GetAllCategoryController = GetAllCategoryController;
//# sourceMappingURL=getAllCategoryController.js.map