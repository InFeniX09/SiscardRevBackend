import { DataTypes } from "sequelize";
import { db } from "../db/connection";

const Ticket = db[0].define(
  "Ticket",
  {
    IdTicket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Asunto: {
      type: DataTypes.STRING,
    },
    Descripcion: {
      type: DataTypes.STRING,
    },
    Usuario_id: {
      type: DataTypes.INTEGER,
    },
    Area_id: {
      type: DataTypes.INTEGER,
    },
    Responsable_id: {
      type: DataTypes.INTEGER,
    },
    Tickectcc_id: {
      type: DataTypes.INTEGER,
    },
    FcCreacion: {
      type: DataTypes.DATE,
    },
    FcCierre: {
      type: DataTypes.DATE,
    },
    idPrioridad: {
      type: DataTypes.INTEGER,
    },
    Estado_id: {
      type: DataTypes.STRING,
    },
    UltimaFechMod: {
      type: DataTypes.DATE,
    },
    UltimoUserMod: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // desactiva el uso de createdAt y updatedAt
  }
);

export default Ticket;
