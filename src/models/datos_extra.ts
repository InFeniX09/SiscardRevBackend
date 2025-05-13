import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const datos_extra = db[0].define(
  "Datos_Extra",
  {
    Dni: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    FcEmo: {
      type: DataTypes.DATE,
    },
    bPolicial: {
      type: DataTypes.BIGINT,
    },
    Contrato: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default datos_extra;
