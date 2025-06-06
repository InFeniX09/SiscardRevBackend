"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const generarJWT = (usuario = '') => {
    // se genera una promesa manual
    return new Promise((resolve, reject) => {
        const payload = { usuario };
        jsonwebtoken_1.default.sign(payload, config_1.default.TOKEN_KEY, {
            expiresIn: config_1.default.TOKEN_EXP
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generarJWT;
