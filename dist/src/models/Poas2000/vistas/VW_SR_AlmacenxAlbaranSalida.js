"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../../db/connectionPoas");
const VW_SR_AlmacenxAlbaranSalida = connectionPoas_1.db1[0].define("VW_SR_AlmacenxAlbaranSalida", {
    almacen_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sDsAlmacen: {
        type: sequelize_1.DataTypes.DATE,
    },
    cliente_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = VW_SR_AlmacenxAlbaranSalida;
