"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../db/connectionPoas");
const fichasAlmacen = connectionPoas_1.db1[0].define("fichasAlmacen", {
    almacen_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    componente_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    nExActuales: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = fichasAlmacen;
