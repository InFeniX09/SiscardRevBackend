import { Request, Response, request, response } from "express";
import VW_SR_AlmacenxAlbaranSalida from "../../models/Poas2000/vistas/VW_SR_AlmacenxAlbaranSalida";
import Albaranes from "../../models/Poas2000/albaranes";
import db1 from "../../db/connectionPoas";
import TransitoSalida from "../../models/Poas2000/transitosalida";
import { Sequelize } from "sequelize";
import Almacenes from "../../models/Poas2000/almacenes";
import VW_ZONAS from "../../models/Poas2000/vw_zonas";
import VW_SR_TAB_GESTION_TECNICOS from "../../models/Poas2000/vistas/VW_SR_TAB_GESTION_TECNICOS";
import VW_CONEXZONAS from "../../models/Poas2000/vistas/VW_CONEXZONAS"
import componentes from "../../models/Poas2000/componentes";
import moment from "moment-timezone";

export const listarTecnicos = async (req = request, res = response) => {
  const { Op } = require("sequelize");
  const Query3 = await VW_ZONAS.findAll({
    where: [
      {
        [Op.and]: [{ zonacabecera_id: 1501000 }, { estadoZona_id: [1, 2, 4] }],
      },
    ],
    order: [["zona_id", "ASC"]],
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

export const listarDatosGeneralesTecnicos = async (
  req = request,
  res = response
) => {
  try {
    // Validación básica
    const { zona_id } = req.body;
    if (!zona_id) {
      return res.status(400).json({
        ok: false,
        msg: "El ID de la zona es requerido",
      });
    }

    // Consulta a la base de datos
    const queryResults = await VW_ZONAS.findAll({
      where: {
        zona_id: zona_id,
      },
    });

    // Respuesta exitosa
    return res.status(200).json({
      ok: true,
      msg: "Información obtenida correctamente",
      data: queryResults,
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener datos generales de técnicos:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la información. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};

export const listarDatosGestionTecnicos = async (
  req = request,
  res = response
) => {
  try {
    // Validación básica
    const { zona_id } = req.body;
    if (!zona_id) {
      return res.status(400).json({
        ok: false,
        msg: "El ID de la zona es requerido",
      });
    }

    // Consulta a la base de datos
    const queryResults = await VW_SR_TAB_GESTION_TECNICOS.findOne({
      where: {
        zona_id: zona_id,
      },
    });

    // Respuesta exitosa
    return res.status(200).json({
      ok: true,
      msg: "Información obtenida correctamente",
      data: queryResults,
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener datos generales de técnicos:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la información. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};



export const listarDatosConexionTecnicos = async (
  req = request,
  res = response
) => {
  try {
    // Validación básica
    const { zona_id } = req.body;
    if (!zona_id) {
      return res.status(400).json({
        ok: false,
        msg: "El ID de la zona es requerido",
      });
    }

    // Consulta a la base de datos
    const queryResults = await VW_CONEXZONAS.findOne({
      where: {
        zona_id: zona_id,
      },
    });

    // Respuesta exitosa
    return res.status(200).json({
      ok: true,
      msg: "Información obtenida correctamente",
      data: queryResults,
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener datos generales de técnicos:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la información. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
