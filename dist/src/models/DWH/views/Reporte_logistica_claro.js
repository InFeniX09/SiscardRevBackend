"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionDWH_1 = require("../../../db/connectionDWH");
const Reporte_logistica_claro = connectionDWH_1.db2[0].define("Reporte_logistica_claro", {
    No_Serie: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    CM_MTA_MAC: {
        type: sequelize_1.DataTypes.STRING,
    },
    EMTA_MTA_MAC: {
        type: sequelize_1.DataTypes.STRING,
    },
    UNIT_ADDRESS: {
        type: sequelize_1.DataTypes.STRING,
    },
    Almacen: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsNIF: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    sDsZona: {
        type: sequelize_1.DataTypes.STRING,
    },
    Componente_SAP: {
        type: sequelize_1.DataTypes.STRING,
    },
    ['Averiado/s']: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    freezeTableName: true, // Para asegurarte que el nombre de la tabla no sea pluralizado
    timestamps: false // Desactiva createdAt y updatedAt
});
exports.default = Reporte_logistica_claro;
