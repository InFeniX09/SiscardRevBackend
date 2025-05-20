"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionDWH_1 = require("../../../db/connectionDWH");
const VW_CONSULTA379_Test = connectionDWH_1.db2[0].define("VW_CONSULTA379_Test", {
    Almacen: {
        type: sequelize_1.DataTypes.STRING,
    },
    Cantidad: {
        type: sequelize_1.DataTypes.STRING,
    },
    Cliente: {
        type: sequelize_1.DataTypes.STRING,
    },
    Tipo: {
        type: sequelize_1.DataTypes.STRING,
    },
    Modelo: {
        type: sequelize_1.DataTypes.STRING,
    },
    Componente_SAP: {
        type: sequelize_1.DataTypes.STRING,
    },
    No_Serie: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    ["Averiado/s"]: {
        type: sequelize_1.DataTypes.STRING,
    },
    DiasEnAlmacen: {
        type: sequelize_1.DataTypes.STRING,
    },
    Poblacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    Provincia: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true, // Para asegurarte que el nombre de la tabla no sea pluralizado
    timestamps: false, // Desactiva createdAt y updatedAt
    indexes: [], // Se deja vacío, sin claves primarias ni índices
});
exports.default = VW_CONSULTA379_Test;
