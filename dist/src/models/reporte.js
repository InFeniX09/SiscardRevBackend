"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Reporte = connection_1.db[0].define("Reporte", {
    IdReporte: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Reporte: {
        type: sequelize_1.DataTypes.STRING,
    },
    Query: {
        type: sequelize_1.DataTypes.STRING,
    },
    TipoReporte: {
        type: sequelize_1.DataTypes.STRING,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Reporte;
