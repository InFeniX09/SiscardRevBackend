import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Estado = db[0].define(
  "Estado",
  {
    IdEstado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Estado: {
      type: DataTypes.STRING,
    },
    CortoEstado: {
      type: DataTypes.STRING,
    },
    Agrupamiento: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Estado;
