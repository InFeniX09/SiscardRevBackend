"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const EquipoSerie = connection_1.db[0].define("EquipoSerie", {
    IdEquipoSerie: {
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
    Serie: {
        type: sequelize_1.DataTypes.STRING,
    },
    Identificador: {
        type: sequelize_1.DataTypes.STRING,
    },
    FcIngreso: {
        type: sequelize_1.DataTypes.DATE,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = EquipoSerie;
