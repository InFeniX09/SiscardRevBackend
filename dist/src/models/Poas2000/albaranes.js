"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectionPoas_1 = require("../../db/connectionPoas");
const Albaranes = connectionPoas_1.db1[0].define("Albaranes", {
    albaran_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    dFcGeneracion: {
        type: sequelize_1.DataTypes.DATE,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    dFcUltimaImpresion: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
});
exports.default = Albaranes;
