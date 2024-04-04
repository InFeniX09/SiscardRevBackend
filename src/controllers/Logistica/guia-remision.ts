import {request, response } from "express";
import VW_SR_AlmacenxAlbaranSalida from "../../models/Poas2000/vistas/VW_SR_AlmacenxAlbaranSalida";
import Albaranes from "../../models/Poas2000/albaranes";



export const listarAlmacenxAlbaranSalida= async (req = request, res = response) => {

  const Query3 = await VW_SR_AlmacenxAlbaranSalida.findAll({
    raw: true,
    order: [['almacen_id', 'ASC']]
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


export const listarAlbaranes= async (req = request, res = response) => {

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
  