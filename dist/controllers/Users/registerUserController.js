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
exports.RegisterUserController = void 0;
const registerUserService_1 = require("../../services/Users/registerUserService");
class RegisterUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, id_author, } = req.body;
            const userRegister = new registerUserService_1.RegisterUserService();
            const newUser = yield userRegister.execute({ id_author, name, email, password });
            res.status(newUser.status).json(newUser);
        });
    }
}
exports.RegisterUserController = RegisterUserController;
//# sourceMappingURL=registerUserController.js.map