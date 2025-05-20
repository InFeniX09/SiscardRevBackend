"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../db/connectionPoas");
const Stock = connectionPoas_1.db1[0].define("Stock", {
    stock_id: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
    },
    componente_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sNmSerie: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado_id: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    dFcEntrada: {
        type: sequelize_1.DataTypes.DATE,
    },
    dFcGarantiaInicio: {
        type: sequelize_1.DataTypes.DATE,
    },
    dFcGarantiaFin: {
        type: sequelize_1.DataTypes.DATE,
    },
    dFcNoRecupero: {
        type: sequelize_1.DataTypes.DATE,
    },
    dFcRecupero: {
        type: sequelize_1.DataTypes.DATE,
    },
    dFcUltMovimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    sNmFirmware: {
        type: sequelize_1.DataTypes.STRING,
    },
    sNmSoftware: {
        type: sequelize_1.DataTypes.STRING,
    },
    ubicacion_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sNmTerminal: {
        type: sequelize_1.DataTypes.STRING,
    },
    bVerificado: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Stock;
