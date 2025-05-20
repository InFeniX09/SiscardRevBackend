"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const EquipoControl = connection_1.db[0].define("EquipoControl", {
    IdEquipoControl: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    EquipoSerie_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    FcMovimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    Observacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    Estado_id: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = EquipoControl;
