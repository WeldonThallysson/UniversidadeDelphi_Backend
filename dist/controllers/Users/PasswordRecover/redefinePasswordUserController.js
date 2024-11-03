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
exports.RedefinePasswordController = void 0;
const redefinePasswordUserService_1 = require("../../../services/Users/PasswordRecover/redefinePasswordUserService");
class RedefinePasswordController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenPassword, newPassword } = req.body;
            const redefinePassword = new redefinePasswordUserService_1.RedefinePasswordService();
            const responseRedefinePassword = yield redefinePassword.execute({ tokenPassword, newPassword });
            return res.status(responseRedefinePassword.data.status).json(responseRedefinePassword.data);
        });
    }
}
exports.RedefinePasswordController = RedefinePasswordController;
//# sourceMappingURL=redefinePasswordUserController.js.map