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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditLiveService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class EditLiveService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, id_category, name, description, urlImage, urlVideo, idURLVideo, tag, tutor, data, status, }) {
            if (name === "" &&
                description === "" &&
                urlImage === "" &&
                urlVideo === "") {
                return {
                    message: "Preencha os campos (nome, descrição, urlImage e urlVideo)!",
                    status: 400,
                };
            }
            /*
            
              if (id_category === "") {
              return {
                message: "Selecione a categoria da live!",
                status: 400,
              };
            }
            */
            if (!id) {
                return {
                    message: "Para realizar essa ação, preencha o campo (id)",
                    status: 400,
                };
            }
            const classExists = yield prisma_1.default.lives.findFirst({
                where: {
                    id: id,
                },
            });
            if (!classExists) {
                return {
                    message: "Não foi possivel editar, essa live não existe!",
                    status: 400,
                };
            }
            yield prisma_1.default.lives.update({
                where: {
                    id: id,
                },
                data: {
                    data,
                    id_category,
                    name,
                    description,
                    urlImage,
                    urlVideo,
                    idURLVideo,
                    tag,
                    tutor,
                    status: status === 'true' ? true : false
                },
            });
            return {
                message: "Live editada com sucesso!",
                status: 200,
            };
        });
    }
}
exports.EditLiveService = EditLiveService;
//# sourceMappingURL=editLiveService.js.map