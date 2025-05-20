"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Estado = connection_1.db[0].define("Estado", {
    IdEstado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Estado: {
        type: sequelize_1.DataTypes.STRING,
    },
    CortoEstado: {
        type: sequelize_1.DataTypes.STRING,
    },
    Agrupamiento: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Estado;
