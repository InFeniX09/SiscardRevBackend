import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Empleado = db[0].define(
  "Empleado",
  {
    IdEmpleado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Correo: {
      type: DataTypes.STRING,
    },
    Telefono: {
      type: DataTypes.STRING,
    },
    Area_id: {
      type: DataTypes.INTEGER,
    },
    Puesto_id: {
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

export default Empleado;
