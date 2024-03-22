import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Prioridad = db[0].define(
  "Prioridad",
  {
    IdPrioridad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    Prioridad: {
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

export default Prioridad;
