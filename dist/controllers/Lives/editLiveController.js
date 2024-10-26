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
exports.EditLiveController = void 0;
const cloudinary_1 = require("cloudinary");
const editLiveService_1 = require("../../services/Lives/editLiveService");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class EditLiveController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, id_category, name, description, urlVideo, idURLVideo, tutor, tag, data, status, } = req.body;
            const editLive = new editLiveService_1.EditLiveService();
            const file = req.files["urlImage"];
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    message: "Error: urlImage não enviada.",
                    status: 400,
                });
            }
            let urlImage;
            const resultFile = yield new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader
                    .upload_stream({
                    public_id: `lives/${id}`,
                    overwrite: true,
                    folder: "lives",
                }, function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                })
                    .end(file.data);
            });
            urlImage = resultFile.secure_url;
            const responseEditLive = yield editLive.execute({
                id,
                id_category,
                name,
                description,
                urlImage: resultFile.url,
                urlVideo,
                idURLVideo,
                tutor,
                tag,
                data,
                status,
            });
            return res.status(responseEditLive.status).json(responseEditLive);
        });
    }
}
exports.EditLiveController = EditLiveController;
//# sourceMappingURL=editLiveController.js.map