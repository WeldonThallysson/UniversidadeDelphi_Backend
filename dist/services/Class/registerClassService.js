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
exports.RegisterClassService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RegisterClassService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id_author, id_category, name, description, urlImage, urlVideo, idURLVideo, tag, tutor, data, }) {
            /*
            const classExists = await prismaClient.class.findFirst({
              where: {
                name: name,
              },
            });
        
            if (classExists) {
              return {
                message:
                  "Não foi possivel cadastrar, essa aula já existe, tente novamente outro nome!",
                status: 400,
              };
            }
             */
            if (name === "" &&
                description === "" &&
                urlImage === "" &&
                urlVideo === "") {
                return {
                    message: "Preencha os campos (nome, descrição, urlImage e urlVideo)!",
                    status: 400,
                };
            }
            if (id_category === "") {
                return {
                    message: "Selecione a categoria da aula!",
                    status: 400,
                };
            }
            yield prisma_1.default.class.create({
                data: {
                    id_author,
                    data,
                    id_category,
                    name,
                    description,
                    urlImage,
                    urlVideo,
                    idURLVideo,
                    tag,
                    tutor,
                },
            });
            return {
                message: "Aula cadastrada com sucesso!",
                status: 201,
            };
        });
    }
}
exports.RegisterClassService = RegisterClassService;
//# sourceMappingURL=registerClassService.js.map