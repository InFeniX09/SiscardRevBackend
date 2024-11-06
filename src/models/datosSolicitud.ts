import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const DatosSolicitud = db[0].define(
  "DatosSolicitud",
  {
    IdSolicitud: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    Dni: {
      type: DataTypes.STRING,
    },
    Puesto: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default DatosSolicitud;
