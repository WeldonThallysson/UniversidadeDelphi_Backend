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
exports.DeleteUsersController = void 0;
const deleteUserService_1 = require("../../services/Users/deleteUserService");
class DeleteUsersController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteUser = new deleteUserService_1.DeleteUsersService();
            const responseDeleteUser = yield deleteUser.execute({ id });
            return res.status(responseDeleteUser.status).json(responseDeleteUser);
        });
    }
}
exports.DeleteUsersController = DeleteUsersController;
//# sourceMappingURL=deleteUsersController.js.map