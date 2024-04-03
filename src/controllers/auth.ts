import { Request, Response, request, response } from "express";
import generarJWT from "../helpers/generar-jwt";
import Persona from "../models/persona";
import { Sequelize } from "sequelize";
import EntradaUsuario from "../models/entradausuario";
import Usuario from "../models/usuario";

/*SiscardForge*/
export const login = async (req = request, res = response) => {
  const { usuario, contrasena } = req.body;

  if (usuario && contrasena) {
    const Query = await Usuario.findOne({
      where: {
        Usuario: usuario,
        Contrasena: contrasena,
      },
    });

    const booleanoLogueo = Query ? 1 : 0;
    /*
    Usuario.belongsTo(Persona, { foreignKey: "idPersona", as: "pe" });
    Persona.belongsTo(Area, { foreignKey: "idArea", as: "a" });
    Persona.belongsTo(Puesto, { foreignKey: "idPuesto", as: "pu" });

    const Query1 = await Usuario.findOne({
      attributes: [
        "IdUsuario",
      ],
      include: [
        {
          model: Persona,
          as: "pe",
          attributes: [],
          required: true,
          include: [
            {
              model: Area,
              as: "a",
              attributes: [],
            },
            {
              model: Puesto,
              as: "pu",
              attributes: [],
            },
          ],
        },
      ],
      where: {
        Usuario: usuario,
        Contrasena: contrasena,
      },
    });*/

    if (booleanoLogueo > 0) {
      try {
        Usuario.belongsTo(Persona, { foreignKey: "idPersona" });

        let Query1 = await Usuario.findOne({
          attributes: [
            [Sequelize.literal('"Persona"."NombreCompleto"'), "NombreCompleto"],
            "IdUsuario",
          ],
          include: [
            {
              model: Persona,
              attributes: [],
              required: true,
            },
          ],
          where: {
            Usuario: usuario,
          },
        });

        const nombreCompleto = Query1?.dataValues.NombreCompleto;
        const idUsuario = Query1?.dataValues.IdUsuario;

        const token = await generarJWT(usuario);

        const now = Date.now();

        const entrada = await EntradaUsuario.create({
          idUsuario: idUsuario,
          UsuarioIp: req.socket.remoteAddress,
          UsuarioEntrada: now,
          UsuarioSalida: null,
          Estado: null,
        });

        return res.status(200).json({
          ok: true,
          msg: "Logueo exitoso",
          token,
          idUsuario,
          usuario,
          nombreCompleto,
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
        msg: "Las credenciales son incorrectas",
      });
    }
  }
};

export const logout = async (req = request, res = response) => {
  let id_Usuario = req.header("x-idUsuario");

  let now = new Date();

  try {
    let sesionAbierta = await EntradaUsuario.findOne({
      where: {
        UsuarioSalida: null,
        idUsuario: id_Usuario,
      },
      order: [["UsuarioEntrada", "DESC"]],
    });

    if (!sesionAbierta) {
      return res.status(200).json({
        ok: true,
        msg: "Deslogueo correcto",
      });
    } else {
      await EntradaUsuario.update(
        {
          UsuarioSalida: now,
          Estado: "S", // cierre no forzado
        },
        {
          where: {
            UsuarioSalida: null,
            idUsuario: id_Usuario,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      ok: false,
      msg: "Contacte con sistemas",
    });
  }
};

export const buscarUsuario = async (req = request, res = response) => {
  const { pUsuario } = req.body;
  Usuario.belongsTo(Persona, { foreignKey: "idPersona" });

  const Query3 = await Usuario.findOne({
    raw: true,
    attributes: ["IdUsuario", "Usuario", "Contrasena", "Correo", "Telefono","FcIngreso","FcBaja","Persona.idPuesto"],
    include: [
      {
        model: Persona,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado: "A",
      Usuario:pUsuario
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
