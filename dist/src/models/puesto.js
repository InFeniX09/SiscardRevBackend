"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Puesto = connection_1.db[0].define("Puesto", {
    IdPuesto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Puesto: {
        type: sequelize_1.DataTypes.STRING,
    },
    Area_id: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Puesto;
