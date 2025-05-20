"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const underscore_1 = __importDefault(require("underscore"));
const generar_log_1 = __importDefault(require("../helpers/generar-log"));
const logInOut = (req = express_1.request, res = express_1.response, next) => {
    const start = Date.now();
    generar_log_1.default.info(`${req.originalUrl} request headers ${JSON.stringify(req.headers)}`);
    if (!underscore_1.default.isEmpty(req.body))
        generar_log_1.default.info(`${req.originalUrl} request body ${JSON.stringify(req.body)}`);
    res.on('finish', () => {
        const end = Date.now();
        generar_log_1.default.info(`${req.originalUrl} response ${res.statusCode} (${res.statusMessage}) in ${end - start} ms`);
    });
    next();
};
exports.default = logInOut;
