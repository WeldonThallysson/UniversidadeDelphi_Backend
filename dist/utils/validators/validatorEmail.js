"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorEmail = void 0;
const validatorEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(value);
    return isEmail;
};
exports.validatorEmail = validatorEmail;
//# sourceMappingURL=validatorEmail.js.map