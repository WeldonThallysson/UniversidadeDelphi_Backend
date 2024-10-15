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
exports.DeleteCourseService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteCourseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const courseExists = yield prisma_1.default.courses.findFirst({
                where: { id },
            });
            if (!courseExists) {
                return {
                    message: "Não foi possível deletar, esse curso não existe!",
                    status: 400,
                };
            }
            try {
                yield prisma_1.default.courses.delete({
                    where: { id },
                });
                return {
                    message: "Curso deletado com sucesso!",
                    status: 200,
                };
            }
            catch (error) {
                if (error &&
                    error.code === "P2003") {
                    return {
                        message: "Não foi possível deletar o curso. Verifique se ele não está vinculado a alguma aula ou categoria.",
                        status: 400,
                    };
                }
                // Tratamento para outros erros inesperados
                return {
                    message: "Erro inesperado ao deletar o curso.",
                    status: 500,
                };
            }
        });
    }
}
exports.DeleteCourseService = DeleteCourseService;
//# sourceMappingURL=deleteCourseService.js.map