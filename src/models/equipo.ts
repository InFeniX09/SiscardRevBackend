import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Equipo = db[0].define(
  "Equipo",
  {
    id_equipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    equipo_imei: {
      type: DataTypes.STRING,
    },
    id_marca: {
      type: DataTypes.INTEGER,
    },
    id_modelo: {
      type: DataTypes.INTEGER,
    },
    id_estado: {
      type: DataTypes.STRING,
    },
    id_area: {
      type: DataTypes.STRING,
    },
    id_cliente: {
      type: DataTypes.STRING,
    },
    id_entidad: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Equipo;
