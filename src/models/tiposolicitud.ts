import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const TipoSolicitud = db[0].define(
  "TipoSolicitud",
  {
    IdTipoSolicitud: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TipoSolicitud: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.STRING,
    },
    UltimaFechMod: {
      type: DataTypes.DATE,
    },
    UltimoUserMod: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default TipoSolicitud;
