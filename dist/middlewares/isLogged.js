"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = isLogged;
const jsonwebtoken_1 = require("jsonwebtoken");
function isLogged(req, res, next) {
    const loggedToken = req.headers.authorization;
    if (!loggedToken) {
        return res
            .status(401)
            .json({
            status: 401,
            message: "Solicitação falhou, essa solicitação necessita do token de autorização.",
        })
            .end();
    }
    const [, token] = loggedToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user_id = sub;
        console.log("-Middleware de verificação de token concluído");
    }
    catch (err) {
        res
            .status(401)
            .json({
            status: 401,
            message: "Solicitação falhou, ocorreu algum error no middleware de verificação de token",
        })
            .end();
    }
    return next();
}
//# sourceMappingURL=isLogged.js.map