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
exports.GetDetailsCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetDetailsCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const categoryExists = yield prisma_1.default.category.findFirst({
                where: {
                    id: id,
                },
            });
            if (!categoryExists) {
                return {
                    data: {
                        message: "Essa categoria não existe!",
                    },
                    status: 400,
                };
            }
            const categoryDetails = yield prisma_1.default.category.findFirst({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    tag: true,
                    status: true,
                    description: true,
                    created_At: true,
                    id_author: true,
                    users: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            status: true,
                            id_author: true
                        }
                    },
                },
            });
            return {
                data: categoryDetails,
                status: 200,
            };
        });
    }
}
exports.GetDetailsCategoryService = GetDetailsCategoryService;
//# sourceMappingURL=getDetailsCategoryService.js.map