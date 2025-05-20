"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const Provincia = connection_1.db[0].define("Provincia", {
    IdProvincia: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Provincia: {
        type: sequelize_1.DataTypes.STRING,
    },
    Departamento_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    UltimaFechMod: {
        type: sequelize_1.DataTypes.DATE,
    },
    UltimoUserMod: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Provincia;
