import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Provincia = db[0].define(
  "Provincia",
  {
    IdProvincia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Provincia: {
      type: DataTypes.STRING,
    },
    Departamento_id: {
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

export default Provincia;
