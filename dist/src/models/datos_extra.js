"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const datos_extra = connection_1.db[0].define("Datos_Extra", {
    Dni: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    FcEmo: {
        type: sequelize_1.DataTypes.DATE,
    },
    bPolicial: {
        type: sequelize_1.DataTypes.BIGINT,
    },
    Contrato: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = datos_extra;
