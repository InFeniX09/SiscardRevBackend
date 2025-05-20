"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const EquipoStock = connection_1.db[0].define("EquipoStock", {
    IdEquipoStock: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Equipo_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    StockActual: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    StockDisponible: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    StockNoDisponible: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = EquipoStock;
