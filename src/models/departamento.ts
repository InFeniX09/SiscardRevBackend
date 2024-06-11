import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Departamento = db[0].define(
  "Departamento",
  {
    IdDepartamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Departamento: {
      type: DataTypes.STRING,
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

export default Departamento;
