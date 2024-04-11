import { Request, Response, request, response } from "express";

import Mensaje from "../../models/mensaje";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";
import { Op, Sequelize } from "sequelize";

export const listarchatSocket = async (data:any) => {

  let pDeUsuario_id= data.DeUsuario_id ? parseInt(data.DeUsuario_id) : null;
  let pParaUsuario_id= data.ParaUsuario_id ? parseInt(data.ParaUsuario_id) : null;
  const Query3 = await Mensaje.findAll({
    raw: true,
    attributes: [
      "IdMensaje",
      "DeUsuario_id",
      "ParaUsuario_id",
      "Mensaje",
      "FechaCreacion",
      "Estado",
    ],
    where: {
      Estado: "A",
      [Op.or]: [
        {
          DeUsuario_id: pDeUsuario_id,
          ParaUsuario_id: pParaUsuario_id
        },
        {
          DeUsuario_id: pParaUsuario_id,
          ParaUsuario_id: pDeUsuario_id
        }
      ]
    },
    order: [
      ["FechaCreacion", "ASC"]
    ]
  });

  return Query3;
};

export const crearMensajeSocket = async (data: any) => {
  let pDeUsuario_id = data.DeUsuario_id ? parseInt(data.DeUsuario_id) : null;
  let pParaUsuario_id = data.ParaUsuario_id
    ? parseInt(data.ParaUsuario_id)
    : null;
  let pMensaje = data.Mensaje?.toString();

  const Query3 = await Mensaje.create({
    DeUsuario_id: pDeUsuario_id,
    ParaUsuario_id: pParaUsuario_id,
    Mensaje: pMensaje,
  });

  return Query3;
};

export const listarUsuarioSocket = async (data: any) => {
  let pTipoEntidad_id = data.TipoEntidad_id
    ? parseInt(data.TipoEntidad_id)
    : null;

  Usuario.belongsTo(Entidad, { foreignKey: "Entidad_id" });

  const Query3 = await Usuario.findAll({
    raw: true,
    attributes: ["IdUsuario", "Usuario"],
    include: [
      {
        model: Entidad,
        attributes: [],
        required: true,
        where: {
          TipoEntidad_id: {
            [Op.like]: pTipoEntidad_id
              ? Sequelize.literal(`ISNULL('${pTipoEntidad_id}', '%')`)
              : "%",
          },
        },
      },
    ],
    where: {
      Estado: "A",
    },
  });
  return Query3;
};
