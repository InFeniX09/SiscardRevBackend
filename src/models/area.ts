import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Area = db[0].define(
  "Area",
  {
    IdArea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Area: {
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

export default Area;
