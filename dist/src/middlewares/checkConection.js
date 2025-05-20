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
// import { connect } from '../database/connection';
const connection_1 = require("../db/connection"); // Importa el arreglo de instancias Sequelize
// Define el middleware
const checkDBConnection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifica la conexión con la base de datos
        const sequelize = connection_1.db[0]; // Por ejemplo, selecciona la primera instancia
        yield sequelize.authenticate(); // Verifica el estado de la conexión
        next(); // Continúa con el siguiente middleware o el controlador del endpoint
    }
    catch (error) {
        console.log('Error de conexión a la base de datos:', error);
        res.status(500).json({ ok: false, message: 'Error de conexión a la base de datos' });
    }
});
// Exporta el middleware para poder usarlo en otros archivos
exports.default = checkDBConnection;
