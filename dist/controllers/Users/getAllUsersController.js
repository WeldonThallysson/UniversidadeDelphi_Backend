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
exports.GetAllUsersController = void 0;
const getAllUsersSevice_1 = require("../../services/Users/getAllUsersSevice");
class GetAllUsersController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_user_logged = req.user_id;
            const name = req.query.name;
            const email = req.query.email;
            const page = req.query.page;
            const limit = req.query.limit;
            const getUsers = new getAllUsersSevice_1.GetAllUserService();
            const resultGetUsers = yield getUsers.execute({
                id_user_logged,
                email,
                name,
                page: Number(page) ? Number(page) : 1,
                limit: Number(limit) ? Number(limit) : 10,
            });
            return res.status(resultGetUsers.status).json(resultGetUsers.data);
        });
    }
}
exports.GetAllUsersController = GetAllUsersController;
//# sourceMappingURL=getAllUsersController.js.map