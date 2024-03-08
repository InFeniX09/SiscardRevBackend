import { Request, Response, request, response } from "express";
import Ticket from "../models/ticket";
import { Op, Sequelize } from "sequelize";


//Listo
export const listarTicket = async (req = request, res = response) => {  

  const Query3 = await Ticket.findAll({
    raw: true,
    attributes: [
      "IdTicket",
      "Titulo",
      "Descripcion",
      "idUsuario",
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
export const crearTicket = async (req = request, res = response) => {
  let ptitulo = req.body.Titulo?.toString();
  let pdescripcion = req.body.Descripcion?.toString();

  const Query3 = await Ticket.create({
    Titulo: ptitulo,
    Descripcion: pdescripcion,
    
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
