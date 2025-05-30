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
exports.connect = exports.db = void 0;
const sequelize_1 = require("sequelize");
exports.db = [];
const SiscardRevolution = new sequelize_1.Sequelize("SiscardRevolutionTest", "sa", "S1sc4rd#01", {
    dialect: "mssql",
    host: "172.17.7.39",
    port: 1433,
    dialectOptions: {},
});
exports.db.push(SiscardRevolution);
exports.default = SiscardRevolution;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    // De la base Halcon se consultan los autorizadores
    try {
        yield SiscardRevolution.authenticate();
        console.log("Base de datos SiscardRevolution online");
    }
    catch (error) {
        console.log("Base de datos SiscardRevolution offline");
        throw error;
    }
});
exports.connect = connect;
