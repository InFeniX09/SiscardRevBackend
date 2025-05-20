"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../db/connectionPoas");
const Zonas = connectionPoas_1.db1[0].define("Zonas", {
    zona_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    sDsCliente: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsNif: {
        type: sequelize_1.DataTypes.STRING,
    },
    sDsDireccion: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Zonas;
