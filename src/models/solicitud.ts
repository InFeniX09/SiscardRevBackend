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
    Solicitud: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Solicitud;
