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
exports.RegisterCategoryController = void 0;
const registerCategoryService_1 = require("../../services/Category/registerCategoryService");
class RegisterCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, tag, description } = req.body;
            const id_author = req.user_id;
            const registerCategory = new registerCategoryService_1.RegisterCategoryService();
            const responseRegisterCategory = yield registerCategory.execute({
                id_author,
                name,
                tag,
                description,
            });
            return res.status(responseRegisterCategory.status).json(responseRegisterCategory);
        });
    }
}
exports.RegisterCategoryController = RegisterCategoryController;
//# sourceMappingURL=registerCategoryController.js.map