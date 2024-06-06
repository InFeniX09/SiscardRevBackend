import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Mensaje = db[0].define(
  "Mensaje",
  {
    IdMensaje: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DeUsuario_id: {
      type: DataTypes.INTEGER,
    },
    ParaUsuario_id: {
      type: DataTypes.INTEGER,
    },
    Mensaje: {
      type: DataTypes.INTEGER,
    },
    FechaCreacion: {
      type: DataTypes.DATE,
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

export default Mensaje;
