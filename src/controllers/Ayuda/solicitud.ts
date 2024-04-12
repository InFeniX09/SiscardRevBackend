import { Request, Response, request, response } from "express";

import Mensaje from "../../models/mensaje";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";
import { Op, Sequelize, json } from "sequelize";
import TipoSolicitud from "../../models/tiposolicitud";
import TipoMotivo from "../../models/tipomotivo";
import Solicitud from "../../models/solicitud";
import Ticket from "../../models/ticket";

export const listarTipoSolicitudSocket = async () => {
  const Query3 = await TipoSolicitud.findAll({
    raw: true,
    attributes: ["IdTipoSolicitud", "TipoSolicitud", "Estado"],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};

export const listarTipoMotivoSocket = async (data: any) => {
  let pTipoSolicitud_id = data.TipoSolicitud_id;

  const Query3 = await TipoMotivo.findAll({
    raw: true,
    attributes: ["IdTipoMotivo", "TipoMotivo", "TipoSolicitud_id", "Estado"],
    where: {
      Estado: "A",
      TipoSolicitud_id: pTipoSolicitud_id,
    },
  });

  return Query3;
};

export const listarSolicitud = async (data: any) => {
  let pUsuario_id = data.Usuario_id;
  
  Solicitud.belongsTo(TipoSolicitud, { foreignKey: "TipoSolicitud_id" });
  Solicitud.belongsTo(TipoMotivo, { foreignKey: "TipoMotivo_id" });
  Solicitud.belongsTo(Usuario, { foreignKey: "Usuario_id" });

  const Query3 = await Solicitud.findAll({
    raw: true,
    attributes: [
      "IdSolicitud",
      "TipoSolicitud.TipoSolicitud",
      "TipoMotivo.TipoMotivo",
      "Usuario.Usuario",
      "Estado",
    ],
    include: [
      {
        model: TipoSolicitud,
        attributes: [],
        required: true,
      },
      {
        model: TipoMotivo,
        attributes: [],
        required: true,
      },
      {
        model: Usuario,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado: "A",
      Usuario_id: {
        [Op.like]: pUsuario_id
          ? Sequelize.literal(`ISNULL('${pUsuario_id}', '%')`)
          : "%",
      },
    },
  });

  return Query3;
};
//Listo
export const crearSolicitudSocket = async (data: any) => {
  let pTipoSolicitud_id = data.TipoSolicitud_id
    ? parseInt(data.TipoSolicitud_id)
    : null;
  let pTipoMotivo_id = data.TipoMotivo_id ? parseInt(data.TipoMotivo_id) : null;
  let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;

  const Query3 = await Solicitud.create({
    TipoSolicitud_id: pTipoSolicitud_id,
    TipoMotivo_id: pTipoMotivo_id,
    Usuario_id: pUsuario_id,
  });

  return Query3;
};

export const listarTicketSocket = async (data: any) => {
    
  let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;

  const Query3 = await Ticket.findAll({
    raw: true,
    attributes: ["IdTicket", "Asunto", "Descripcion", "Usuario_id"],
    where: {
      Estado: "A",
      Usuario_id: {
        [Op.like]: pUsuario_id
          ? Sequelize.literal(`ISNULL('${pUsuario_id}', '%')`)
          : "%",
      },
    },
  });

  return Query3;
};

export const crearTicketSocket = async (data:any) => {
    let pasunto = data.Asunto?.toString();
    let pdescripcion = data.Descripcion?.toString();
    let pUsuario_id = data.Usuario_id ? parseInt(data.Usuario_id) : null;
    let pidArea = data.idArea ? parseInt(data.idArea) : null;
    let pidTicketcc = data.idTicketcc ? parseInt(data.idTicketcc) : null;
    let pidPrioridad = data.idPrioridad ? parseInt(data.idPrioridad) : null;
  
    const Query3 = await Ticket.create({
      Asunto: pasunto,
      Descripcion: pdescripcion,
      idUsuario: pUsuario_id,
      idArea:pidArea,
      idTicketcc:pidTicketcc,
      idPrioridad:pidPrioridad
    });
  
    return Query3;
  };