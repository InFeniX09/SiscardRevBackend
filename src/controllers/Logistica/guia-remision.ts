import { Request, Response, request, response } from "express";
import VW_SR_AlmacenxAlbaranSalida from "../../models/Poas2000/vistas/VW_SR_AlmacenxAlbaranSalida";
import Albaranes from "../../models/Poas2000/albaranes";
import db1 from "../../db/connectionPoas";
import TransitoSalida from "../../models/Poas2000/transitosalida";
import { Sequelize } from "sequelize";
import Almacenes from "../../models/Poas2000/almacenes";
import Zonas from "../../models/Poas2000/zonas";
import Clientes from "../../models/Poas2000/clientes";
import componentes from "../../models/Poas2000/componentes";

export const listarAlmacenxAlbaranSalida = async (
  req = request,
  res = response
) => {
  const Query3 = await VW_SR_AlmacenxAlbaranSalida.findAll({
    raw: true,
    order: [["almacen_id", "ASC"]],
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        msg: "Error de conexión",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      msg: "Error de conexión",
    });
  }
};

export const listarAlbaranes = async (req = request, res = response) => {
  const Query3 = await Albaranes.findAll({
    raw: true,
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        msg: "Error de conexión",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      msg: "Error de conexión",
    });
  }
};

export const listarAlbaranSalidaxZona = async (req: Request, res: Response) => {
  try {
    const { zona_id } = req.body; // Obtén el valor de idTipoMarca de la consulta

    const [results, metadata] = await db1.query(
      "EXEC SP_SR_AlbaranSalidaxZona :zona_id",
      {
        replacements: { zona_id }, // Pasar el valor del parámetro
      }
    );

    // Extrae la lista de marcas del resultado
    const selectmarca = results.map((result: any) => ({
      albaran_id: result.albaran_id,
      dFcGeneracion: result.dFcGeneracion,
      usuario_id: result.usuario_id,
      dFcUltimaImpresion: result.dFcUltimaImpresion,
    }));

    res.json(selectmarca);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ocurrió un error al obtener las marcas.",
    });
  }
};

export const listarDetalleAlbaranSalida = async (req = request, res = response) => {
  
  const { palbaran_id } = req.body;

  TransitoSalida.belongsTo(componentes, { foreignKey: "componente_id" });

  const Query3 = await TransitoSalida.findAll({
    raw: true,
    attributes: [
      "nComponentes",
      "componente.sDsComponente",
      [Sequelize.literal("CASE WHEN sNmSerie='1' THEN '' ELSE sNmSerie END"), "sNmSerie"]
    ],
    include: [
      {
        model: componentes,
        attributes: [],
        required: true,
      }
    ],
    where: {
      albaran_id: palbaran_id
    },
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        msg: "Error de conexión",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      msg: "Error de conexión",
    });
  }
};

export const listarDatosPdfAlbaranSalida = async (req = request, res = response) => {

  const { palmacen_id } = req.body;


  Almacenes.belongsTo(Zonas, { foreignKey: "almacen_id" });
  Almacenes.belongsTo(Clientes, { foreignKey: "cliente_id" });

  const Query3 = await Almacenes.findAll({
    raw: true,
    attributes: [
      "Cliente.sDsDireccion",
      "Cliente.sDsCliente",
      "Cliente.sDsNif",
      "Zona.sDsZona",
      "Zona.sDsNIF",
      
    ],
    include: [
      {
        model: Zonas,
        attributes: [],
        required: true,
      },
      {
        model: Clientes,
        attributes: [],
        required: true,
      }
    ],
    where: {
      almacen_id: palmacen_id,
    },
  });

  if (Query3) {
    try {
      console.log(Query3);
      return res.status(200).json({
        ok: true,
        msg: "Informacion Correcta",
        Query3,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        msg: "Error de conexión",
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      msg: "Error de conexión",
    });
  }
};