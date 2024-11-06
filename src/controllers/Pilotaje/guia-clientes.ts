import { Request, Response, request, response } from "express";
import VW_SR_AlmacenxAlbaranSalida from "../../models/Poas2000/vistas/VW_SR_AlmacenxAlbaranSalida";
import Albaranes from "../../models/Poas2000/albaranes";
import db1 from "../../db/connectionPoas";
import TransitoSalida from "../../models/Poas2000/transitosalida";
import { Sequelize } from "sequelize";
import Almacenes from "../../models/Poas2000/almacenes";
import Zonas from "../../models/Poas2000/zonas";
import VW_Clientes from "../../models/Poas2000/vw_clientes";
import componentes from "../../models/Poas2000/componentes";
import moment from "moment-timezone";

export const listarClientes = async (req = request, res = response) => {
  
  const Query3 = await VW_Clientes.findAll({
    order: [["cliente_id", "ASC"]],
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
