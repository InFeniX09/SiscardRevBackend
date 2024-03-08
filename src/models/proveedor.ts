import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Proveedor = db[0].define(
  "Proveedor",
  {
    IdProveedor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Proveedor: {
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

export default Proveedor;
