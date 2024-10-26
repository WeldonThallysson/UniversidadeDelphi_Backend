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
exports.GetDetailsUsersController = void 0;
const getUserDetailsService_1 = require("../../services/Users/getUserDetailsService");
class GetDetailsUsersController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const detailsUser = new getUserDetailsService_1.GetDetailsUserService();
            const responseDetailsUser = yield detailsUser.execute({ id });
            return res.status(responseDetailsUser.status).json(responseDetailsUser.data);
        });
    }
}
exports.GetDetailsUsersController = GetDetailsUsersController;
//# sourceMappingURL=getUserDetailsController.js.map