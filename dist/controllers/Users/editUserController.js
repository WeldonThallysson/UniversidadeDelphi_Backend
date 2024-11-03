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
exports.EditUsersController = void 0;
const editUserService_1 = require("../../services/Users/editUserService");
class EditUsersController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_user_logged = req.user_id;
            const { id, name, email, status, masterAccess, password } = req.body;
            const editUser = new editUserService_1.EditUsersService();
            const responseEditUser = yield editUser.execute({
                id,
                name,
                email,
                status,
                masterAccess,
                id_user_logged,
                password
            });
            return res.status(responseEditUser.status).json(responseEditUser);
        });
    }
}
exports.EditUsersController = EditUsersController;
//# sourceMappingURL=editUserController.js.map