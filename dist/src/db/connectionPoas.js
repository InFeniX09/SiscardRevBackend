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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPoas = exports.db1 = void 0;
const sequelize_1 = require("sequelize");
exports.db1 = [];
const Poas2000 = new sequelize_1.Sequelize('Poas2000', 'sa', 'kpL40Sis23', {
    dialect: 'mssql',
    host: '172.17.7.12',
    timezone: '',
    port: 1433,
    dialectOptions: {
        options: {
            encrypt: true
        }
    },
});
exports.db1.push(Poas2000);
exports.default = Poas2000;
const connectPoas = () => __awaiter(void 0, void 0, void 0, function* () {
    // De la base Halcon se consultan los autorizadores
    try {
        yield Poas2000.authenticate();
        console.log('Base de datos Poas2000 online');
    }
    catch (error) {
        console.log('Base de datos Poas2000 offline');
        throw error;
    }
});
exports.connectPoas = connectPoas;
