import { Request, Response, request, response } from "express";
import Ticket from "../models/ticket";
import  db  from "../db/connection";


//Listo
export const listarTicket = async (req = request, res = response) => {  

  const Query3 = await Ticket.findAll({
    raw: true,
    attributes: [
      "IdTicket",
      "Asunto",
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
export const listarTicketSocket = async () => {  

  const Query3 = await Ticket.findAll({
    raw: true,
    attributes: [
      "IdTicket",
      "Asunto",
      "Descripcion",
      "idUsuario",
    ],
    where: {
      Estado: "A",
    },   
  });

 return Query3
   
};


//Listo
export const crearTicket = async (data:any) => {
  let pasunto = data.Asunto?.toString();
  let pdescripcion = data.Descripcion?.toString();
  let pidUsuario = data.idUsuario ? parseInt(data.idUsuario) : null;
  let pidArea = data.idArea ? parseInt(data.idArea) : null;
  let pidTicketcc = data.idTicketcc ? parseInt(data.idTicketcc) : null;
  let pidPrioridad = data.idPrioridad ? parseInt(data.idPrioridad) : null;

  const Query3 = await Ticket.create({
    Asunto: pasunto,
    Descripcion: pdescripcion,
    idUsuario: pidUsuario,
    idArea:pidArea,
    idTicketcc:pidTicketcc,
    idPrioridad:pidPrioridad
  });

  return Query3;
};

//Listo
export const listarTicketEstadoxFecha = async (req: Request, res: Response) => {
  try {
      const { DiasAtras } = req.query; // Obtén el valor de idTipoMarca de la consulta

      const [results, metadata] = await db.query('EXEC FiltrarTicketsPorFecha :DiasAtras', {
          replacements: { DiasAtras }, // Pasar el valor del parámetro
      });

      // Extrae la lista de marcas del resultado
      const selectmarca = results.map((result: any) => ({
          Dia: result.Dia,
          Asunto: result.Asunto,
          cantidad: result.cantidad
      }));

      res.json(selectmarca);
  } catch (error) {
      console.error(error);
      res.status(500).json({
          msg: 'Ocurrió un error al obtener las marcas.'
      });
  }
}

