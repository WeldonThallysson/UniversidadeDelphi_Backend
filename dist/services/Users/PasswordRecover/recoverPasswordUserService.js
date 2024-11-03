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
exports.RecoverPasswordService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailerConfig_1 = require("../../../constants/configs/nodemailerConfig");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validatorEmail_1 = require("../../../utils/validators/validatorEmail");
class RecoverPasswordService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            if (!email) {
                return {
                    data: {
                        message: "Por favor informe seu email para prosseguir.",
                        status: 400,
                    },
                };
            }
            if (!(0, validatorEmail_1.validatorEmail)(email)) {
                return {
                    data: {
                        message: "Não foi possivel prosseguir com a ação, E-mail inválido.",
                        status: 400,
                    },
                };
            }
            try {
                const userExists = yield prisma_1.default.users.findFirst({
                    where: {
                        email: email,
                    },
                });
                if (!userExists) {
                    return {
                        data: {
                            message: "Não foi possivel prosseguir com a ação, usuário não encontrado!",
                            status: 404,
                        },
                    };
                }
                const tokenRecoverPassword = jsonwebtoken_1.default.sign({ userId: userExists.id }, process.env.JWT_SECRET, { expiresIn: "30min" });
                const resetLink = `${process.env.FRONTEND_URL}${process.env.LINK_REDEFINE_PASSWORD_URL}/${tokenRecoverPassword}`;
                const filePath = path_1.default.join(__dirname, "../../../constants/templates/templateRecoverPassword.html");
                let htmlContent = fs_1.default.readFileSync(filePath, "utf-8");
                htmlContent = htmlContent
                    .replace("{{resetLink}}", resetLink)
                    .replace("{{userName}}", userExists.name.split(" ")[0]);
                const mailOptions = {
                    from: `"Suporte Universidade Delphi" <${process.env.EMAIL_USER}>`,
                    to: userExists.email,
                    subject: "Redefinição de Senha",
                    html: htmlContent,
                    messageId: `<${Date.now()}-${Math.random().toString(36).slice(2)}>`,
                    headers: { 'X-Entity-Ref-ID': `${Date.now()}` },
                };
                yield nodemailerConfig_1.transporter.sendMail(mailOptions);
                return {
                    data: {
                        message: "E-mail de recuperação enviado, confira sua caixa de entrada.",
                        status: 200,
                    },
                };
            }
            catch (err) {
                console.log(err);
                return {
                    data: {
                        err: err,
                        message: "Error ao enviar e-mail para recuperação de senha.",
                        status: 500,
                    },
                };
            }
        });
    }
}
exports.RecoverPasswordService = RecoverPasswordService;
//# sourceMappingURL=recoverPasswordUserService.js.map