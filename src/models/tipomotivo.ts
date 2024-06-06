import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const TipoMotivo = db[0].define(
  "TipoMotivo",
  {
    IdTipoMotivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TipoMotivo: {
      type: DataTypes.STRING,
    },
    TipoSolicitud_id: {
      type: DataTypes.INTEGER,
    },
    Estado_id: {
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

export default TipoMotivo;
