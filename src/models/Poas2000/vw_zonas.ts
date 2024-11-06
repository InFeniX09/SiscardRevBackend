import { DataTypes } from "sequelize";
import { db1 } from "../../db/connectionPoas";

const VW_ZONAS = db1[0].define(
  "VW_ZONAS",
  {
    zona_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sDsZona: {
      type: DataTypes.STRING,
    },
    sDsNif: {
      type: DataTypes.STRING,
    },
    sDsDireccion: {
      type: DataTypes.STRING,
    },
    zonacabecera_id: {
      type: DataTypes.NUMBER,
    },
    estadoZona_id: {
      type: DataTypes.NUMBER,
    },
    sDsPoblacion: {
      type: DataTypes.STRING,
    },
    sDsContacto: {
      type: DataTypes.STRING,
    },
    cdubigeo_id: {
      type: DataTypes.STRING,
    },
    sDsProvincia: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default VW_ZONAS;
