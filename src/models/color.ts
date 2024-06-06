import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Color = db[0].define(
  "Color",
  {
    IdColor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Color: {
      type: DataTypes.STRING,
    },
    Codigo: {
      type: DataTypes.STRING,
    },
    Estado_id: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Color;
