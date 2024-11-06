import { DataTypes } from "sequelize";
import { db } from "../../db/connection";

const VW_SR_MIS_TICKETS = db[0].define(
  "VW_SR_MIS_TICKETS",
  {
    IdTicket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Asunto: {
      type: DataTypes.STRING,
    },
    Descripcion: {
      type: DataTypes.STRING,
    },
    FcCreacion: {
      type: DataTypes.STRING,
    },
    Prioridad: {
      type: DataTypes.STRING,
    },
    Responsable: {
      type: DataTypes.STRING,
    },
    Area: {
      type: DataTypes.STRING,
    },
    FcCierre: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.STRING,
    },
    Usuario_id: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default VW_SR_MIS_TICKETS;
