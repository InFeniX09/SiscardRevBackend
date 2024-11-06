import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Solicitud = db[0].define(
  "Solicitud",
  {
    IdSolicitud: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TipoSolicitud_id: {
      type: DataTypes.INTEGER,
    },
    TipoMotivo_id: {
      type: DataTypes.INTEGER,
    },
    Usuario_id: {
      type: DataTypes.INTEGER,
    },
    FcCreacion: {
      type: DataTypes.TIME,
    },
    Estado_id: {
      type: DataTypes.STRING,
    },
    Cliente_id: {
      type: DataTypes.INTEGER,
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

export default Solicitud;
