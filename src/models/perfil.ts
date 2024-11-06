import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Perfil = db[0].define(
  "Perfil",
  {
    IdPerfil: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Perfil: {
      type: DataTypes.INTEGER,
    },
    Area_id:{
      type: DataTypes.INTEGER,
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

export default Perfil;
