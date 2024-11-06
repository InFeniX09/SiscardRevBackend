import { DataTypes } from "sequelize";
import { db1 } from "../../../db/connectionPoas";

const VW_SR_TAB_GESTION_TECNICOS = db1[0].define(
  "VW_SR_TAB_GESTION_TECNICOS",
  {
    zona_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    estadozona_id: {
      type: DataTypes.STRING,
    },
    sDsEstadoZona: {
      type: DataTypes.STRING,
    },
    usuario_id: {
      type: DataTypes.STRING,
    },
    sDsUsuario: {
      type: DataTypes.STRING,
    },
    diroper_id: {
      type: DataTypes.STRING,
    },
    sDsDirOperaciones: {
      type: DataTypes.STRING,
    },
    zonacabecera_id: {
      type: DataTypes.STRING,
    },
    nSatur: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default VW_SR_TAB_GESTION_TECNICOS;
