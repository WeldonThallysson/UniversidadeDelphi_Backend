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
exports.LoginUserController = void 0;
const loginService_1 = require("../../services/Users/loginService");
class LoginUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, } = req.body;
            const loginUser = new loginService_1.LoginUserService();
            const users = yield loginUser.execute({ email, password });
            return res.status(users.status).json(users.data);
        });
    }
}
exports.LoginUserController = LoginUserController;
//# sourceMappingURL=loginController.js.map