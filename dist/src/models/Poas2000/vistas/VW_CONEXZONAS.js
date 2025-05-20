"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../../db/connectionPoas");
const VW_CONEXZONAS = connectionPoas_1.db1[0].define("VW_CONEXZONAS", {
    zona_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    tipoconexion_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsConexion: {
        type: sequelize_1.DataTypes.STRING,
    },
    bDefault: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsTipoConexion: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = VW_CONEXZONAS;
