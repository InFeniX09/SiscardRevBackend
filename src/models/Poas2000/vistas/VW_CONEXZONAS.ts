import { DataTypes } from "sequelize";
import { db1 } from "../../../db/connectionPoas";

const VW_CONEXZONAS = db1[0].define(
  "VW_CONEXZONAS",
  {
    zona_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoconexion_id: {
      type: DataTypes.STRING,
    },
    sDsConexion: {
      type: DataTypes.STRING,
    },
    bDefault: {
      type: DataTypes.STRING,
    },
    sDsTipoConexion: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default VW_CONEXZONAS;
