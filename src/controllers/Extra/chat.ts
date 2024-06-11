import { Request, Response, request, response } from "express";
import Mensaje from "../../models/mensaje";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";
import { Op, Sequelize, QueryTypes } from "sequelize";
import Reporte from "../../models/reporte";
import db1 from "../../db/connectionPoas";
import Menu from "../../models/menu";
import sequelize from "sequelize";
const ExcelJS = require("exceljs");

export const listarchatSocket = async (data: any) => {
  let pDeUsuario_id = data.DeUsuario_id ? parseInt(data.DeUsuario_id) : null;
  let pParaUsuario_id = data.ParaUsuario_id
    ? parseInt(data.ParaUsuario_id)
    : null;
  const Query3 = await Mensaje.findAll({
    raw: true,
    attributes: [
      "IdMensaje",
      "DeUsuario_id",
      "ParaUsuario_id",
      "Mensaje",
      "FechaCreacion",
      "Estado_id",
    ],
    where: {
      Estado_id: "1",
      [Op.or]: [
        {
          DeUsuario_id: pDeUsuario_id,
          ParaUsuario_id: pParaUsuario_id,
        },
        {
          DeUsuario_id: pParaUsuario_id,
          ParaUsuario_id: pDeUsuario_id,
        },
      ],
    },
    order: [["FechaCreacion", "ASC"]],
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
    attributes: [
      "IdUsuario",
      "Usuario",
      "Clave",
      "Correo",
      "Telefono",
      "FcIngreso",
      "FcBaja",
      "RutaImagen",
      "Entidad_id",
      "Online",
      "Estado_id",
    ],
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
      Estado_id: "1",
    },
  });
  return Query3;
};
/**/
export const listarReporte = async () => {
  const Query3 = await Reporte.findAll({
    raw: true,
    attributes: ["IdReporte", "Reporte", "Query", "TipoReporte", "Estado_id"],
    where: {
      Estado_id: "1",
    },
  });
  return Query3;
};
export const generarExcelReporte = async (data: any) => {
  const reporte: any = await Reporte.findByPk(data.Reporte, {
    attributes: ["Query"],
    raw: true,
  });

  const query = reporte.Query;

  const dataResult = await db1.query(query, { type: QueryTypes.SELECT });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Reporte");

  // Agregar encabezados de columnas
  worksheet.columns = Object.keys(dataResult[0]).map((key) => ({
    header: key,
    key,
    width: 20,
  }));

  // Agregar filas con los datos
  dataResult.forEach((row) => {
    worksheet.addRow(row);
  });

  // Escribir el archivo en un buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Enviar el buffer al frontend
  return { buffer: buffer.toString("base64") };
};

export const listarMenuxUsuarioxPerfil = async (data: any) => {
  const menus = await Menu.findAll({
    raw: true,
    where: {
      IdMenu: {
        [Op.in]: [
          sequelize.literal(`(SELECT Menu_id FROM MenuAsignado WHERE PerfilUsuario_id=(select Perfil_id from PerfilUsuario where Usuario_id=${data.Usuario_id} )) UNION
         (SELECT Menu_id FROM MenuAsignado WHERE Usuario_id=${data.Usuario_id})`),
        ],
      },
    },
  });
  return menus;
};
