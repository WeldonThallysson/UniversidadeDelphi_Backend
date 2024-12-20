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
exports.DeleteLiveController = void 0;
const deleteLiveService_1 = require("../../services/Lives/deleteLiveService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class DeleteLiveController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleteLive = new deleteLiveService_1.DeleteLiveService();
            yield cloudinary_1.v2.uploader.destroy(`lives/${id}`, function (error, result) {
                if (error) {
                    console.error("Erro ao deletar imagem do Cloudinary:", error);
                }
            });
            const responseDeleteLive = yield deleteLive.execute({
                id,
            });
            return res.status(responseDeleteLive.status).json(responseDeleteLive);
        });
    }
}
exports.DeleteLiveController = DeleteLiveController;
//# sourceMappingURL=deleteLiveController.js.map