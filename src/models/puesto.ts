import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Puesto = db[0].define(
  "Puesto",
  {
    IdPuesto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Puesto: {
      type: DataTypes.STRING,
    },
    Area_id: {
      type: DataTypes.NUMBER,
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

export default Puesto;
