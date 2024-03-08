import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Cliente = db[0].define(
  "Cliente",
  {
    IdCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CodCliente: {
      type: DataTypes.STRING,
    },
    DescripcionCliente: {
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

export default Cliente;
