import { Request, Response, request, response } from "express";

import Menu from "../models/menu";
import  db  from "../db/connection";

//Listo
export const listarMenu= async (req = request, res = response) => {  

  const Query3 = await Menu.findAll({
    raw: true,
    attributes: [
      "IdMenu",
      "Menu",
      "Ruta",
      "RutaImagen",
      "Comando",
      "idTipoMenu",
      "idPadre",
      "Estado",
      "UltimaFechMod",
      "UltimoUserMod",
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
export const listarMenuxUsuarioxPerfil = async (req: Request, res: Response) => {
    try {
        
        

        const { idUsuario,idPerfil } = req.query; // Obtén el valor de idTipoMarca de la consulta


        const [results, metadata] = await db.query('EXEC listarMenuxUsuarioxPerfil :idUsuario, :idPerfil', {
            replacements: { idUsuario,idPerfil }, // Pasar el valor del parámetro
        });
  
        // Extrae la lista de marcas del resultado
        const selectmarca = results.map((result: any) => ({
            IdMenu:result.IdMenu,
            Menu:result.Menu,
            Ruta:result.Ruta,
            RutaImagen:result.RutaImagen,
            Comando:result.Comando,
            idTipoMenu:result.idTipoMenu,
            idPadre:result.idPadre,
            Estado:result.Estado,
            UltimaFechMod:result.UltimaFechMod,
            UltimoUserMod:result.UltimoUserMod,
        }));
  
        res.json(selectmarca);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Ocurrió un error al obtener las marcas.'
        });
    }
  }
  
  