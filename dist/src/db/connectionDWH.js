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
exports.ConnectDWH = exports.db2 = void 0;
const sequelize_1 = require("sequelize");
exports.db2 = [];
const DWH = new sequelize_1.Sequelize('DWCLARO', 'sa', 'S1sc4rd#01', {
    dialect: 'mssql',
    host: '172.17.7.39',
    timezone: '',
    port: 1433,
    dialectOptions: {
        options: {
            encrypt: true
        }
    },
});
exports.db2.push(DWH);
exports.default = DWH;
const ConnectDWH = () => __awaiter(void 0, void 0, void 0, function* () {
    // De la base Halcon se consultan los autorizadores
    try {
        yield DWH.authenticate();
        console.log('Base de datos DWH online');
    }
    catch (error) {
        console.log('Base de datos DWH offline');
        throw error;
    }
});
exports.ConnectDWH = ConnectDWH;
