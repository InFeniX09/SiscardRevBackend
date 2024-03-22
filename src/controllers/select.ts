import { Request, Response, request, response } from "express";
import Ticket from "../models/ticket";
import  db  from "../db/connection";
import Area from "../models/area";
import Prioridad from "../models/priodidad";
import Usuario from "../models/usuario";
//Listo
export const listarArea = async (req = request, res = response) => {  

    const Query3 = await Area.findAll({
      raw: true,
      attributes: [
        "IdArea",
        "Area"
      ],
      where: {
        Estado: "A",
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
//Listo
export const listarPrioridad= async (req = request, res = response) => {  

    const Query3 = await Prioridad.findAll({
      raw: true,
      attributes: [
        "IdPrioridad",
        "Prioridad"
      ],
      where: {
        Estado: "A",
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
//Listo
export const listarUsuario= async (req = request, res = response) => {  

    const Query3 = await Usuario.findAll({
      raw: true,
      attributes: [
        "IdUsuario",
        "Usuario",
        "Correo",
        "RutaImagen"
      ],
      where: {
        Estado: "A",
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