"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: {
        fileSize: 1024 * 1024,
    },
}));
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            err: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});
app.use(routes_1.router);
app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}, () => {
    console.log("Servidor online");
});
//# sourceMappingURL=server.js.map