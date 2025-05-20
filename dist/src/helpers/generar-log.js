"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const simple_node_logger_1 = __importDefault(require("simple-node-logger"));
const logger = simple_node_logger_1.default.createRollingFileLogger(config_1.default.log);
exports.default = logger;
