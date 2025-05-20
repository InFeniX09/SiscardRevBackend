"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../../db/connectionPoas");
const VW_SR_TAB_GESTION_TECNICOS = connectionPoas_1.db1[0].define("VW_SR_TAB_GESTION_TECNICOS", {
    zona_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    estadozona_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsEstadoZona: {
        type: sequelize_1.DataTypes.STRING,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsUsuario: {
        type: sequelize_1.DataTypes.STRING,
    },
    diroper_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsDirOperaciones: {
        type: sequelize_1.DataTypes.STRING,
    },
    zonacabecera_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    nSatur: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = VW_SR_TAB_GESTION_TECNICOS;
