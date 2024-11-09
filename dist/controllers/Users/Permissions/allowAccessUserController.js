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
exports.AllowAccessUserController = void 0;
const allowAccessUserServices_1 = require("../../../services/Users/Permissions/allowAccessUserServices");
class AllowAccessUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_user_logged = req.user_id;
            const { email_user, masterAccessParam, } = req.body;
            const allowAccess = new allowAccessUserServices_1.AllowAccessUserService();
            const responseAllowAccess = yield allowAccess.execute({ email_user, id_user_logged, masterAccessParam });
            return res.status(responseAllowAccess.data.status).json(responseAllowAccess.data);
        });
    }
}
exports.AllowAccessUserController = AllowAccessUserController;
//# sourceMappingURL=allowAccessUserController.js.map