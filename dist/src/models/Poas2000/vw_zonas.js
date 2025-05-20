"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../db/connectionPoas");
const VW_ZONAS = connectionPoas_1.db1[0].define("VW_ZONAS", {
    zona_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    sDsZona: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsNif: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsDireccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    zonacabecera_id: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    estadoZona_id: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    sDsPoblacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsContacto: {
        type: sequelize_1.DataTypes.STRING,
    },
    cdubigeo_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsProvincia: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = VW_ZONAS;
