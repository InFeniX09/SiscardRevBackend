import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Marca = db[0].define(
  "Marca",
  {
    IdMarca: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Marca: {
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

export default Marca;
