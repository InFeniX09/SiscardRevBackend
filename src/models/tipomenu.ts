import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const TipoMenu = db[0].define(
  "TipoMenu",
  {
    IdTipoMenu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    TipoMenu: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default TipoMenu;
