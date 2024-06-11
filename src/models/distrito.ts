import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Distrito = db[0].define(
  "Distrito",
  {
    IdDistrito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Distrito: {
      type: DataTypes.STRING,
    },
    Provincia_id: {
      type: DataTypes.INTEGER,
    },
    Estado_id: {
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

export default Distrito;
