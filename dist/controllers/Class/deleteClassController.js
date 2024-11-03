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
exports.DeleteClassController = void 0;
const deleteClassService_1 = require("../../services/Class/deleteClassService");
class DeleteClassController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteClass = new deleteClassService_1.DeleteClassService();
            const responseEditClass = yield deleteClass.execute({
                id,
            });
            return res.status(responseEditClass.status).json(responseEditClass);
        });
    }
}
exports.DeleteClassController = DeleteClassController;
//# sourceMappingURL=deleteClassController.js.map