import Usuario from "../../models/usuario";
import { Model, Op, Sequelize, json } from "sequelize";
import TipoSolicitud from "../../models/tiposolicitud";
import TipoMotivo from "../../models/tipomotivo";
import Solicitud from "../../models/solicitud";
import Ticket from "../../models/ticket";
import Marca from "../../models/marca";
import TipoEquipo from "../../models/tipoequipo";
import Modelo from "../../models/modelo";
import Equipo from "../../models/equipo";
import Cliente from "../../models/cliente";

export const listarTipoEquipoSocket = async () => {

    const Query3 = await TipoEquipo.findAll({
      raw: true,
      attributes: ["IdTipoEquipo", "TipoEquipo", "Clasificacion", "Estado"],
      where: {
        Estado: "A",
      },
    });
  
    return Query3;
  };

export const listarMarcaSocket = async () => {
  Marca.belongsTo(TipoEquipo, { foreignKey: "TipoEquipo_id" });

  const Query3 = await Marca.findAll({
    raw: true,
    attributes: ["IdMarca", "Marca","TipoEquipo.TipoEquipo", "Estado"],
    include: [
      {
        model: TipoEquipo,
        attributes: [],
        required: true,
      }
    ],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};

export const listarModeloSocket = async () => {
  Modelo.belongsTo(Marca, { foreignKey: "Marca_id" });

  const Query3 = await Modelo.findAll({
    raw: true,
    attributes: ["IdModelo", "Modelo", "Marca.Marca", "Estado"],
    include: [
      {
        model: Marca,
        attributes: [],
        required: true,
      }
    ],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};
export const listarEquipoSocket = async () => {
  Equipo.belongsTo(Marca, { foreignKey: "Marca_id" });
  Equipo.belongsTo(Modelo, { foreignKey: "Modelo_id" });
  Equipo.belongsTo(Cliente, { foreignKey: "Cliente_id" });

  const Query3 = await Equipo.findAll({
    raw: true,
    attributes: ["IdEquipo", "Marca.Marca", "Modelo.Modelo","Cliente.CodCliente","Especificacion","Gamma", "Estado"],
    include: [
      {
        model: Marca,
        attributes: [],
        required: true,
      },
      {
        model: Modelo,
        attributes: [],
        required: true,
      },
      {
        model: Cliente,
        attributes: [],
        required: true,
      }
    ],
    where: {
      Estado: "A",
    },
  });

  return Query3;
};