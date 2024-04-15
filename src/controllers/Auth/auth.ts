import { request, response } from "express";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";
import TransitoSalida from "../../models/Poas2000/transitosalida";
import Albaranes from "../../models/Poas2000/albaranes";

export const buscarUsuario = async (req = request, res = response) => {
  const { pUsuario } = req.body;
  Usuario.belongsTo(Entidad, { foreignKey: "Entidad_id" });

  const Query3 = await Usuario.findOne({
    raw: true,
    attributes: [
      "IdUsuario",
      "Usuario",
      "Clave",
      "Correo",
      "Telefono",
      "FcIngreso",
      "FcBaja",
      "Entidad.Puesto_id",
    ],
    include: [
      {
        model: Entidad,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado: "A",
      Usuario: pUsuario,
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

export const listarUsuario = async (req = request, res = response) => {
  const Query3 = await Usuario.findAll({
    raw: true,
    attributes: [
      "IdUsuario",
      "Usuario",
      "Clave",
      "Correo",
      "Telefono",
      "FcIngreso",
      "FcBaja",
      "RutaImagen",
      "Entidad_id",
      "Estado",
    ],
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

export const listarEntidad = async (req = request, res = response) => {
  const Query3 = await Entidad.findAll({
    raw: true,
    attributes: [
      "IdEntidad",
      "Nombres",
      "Apellidos",
      "NombreCompleto",
      "TipoDocumento_id",
      "NroDocumento",
      "Correo",
      "Telefono",
      "Direccion",
      "Genero",
      "FcNacimiento",
      "Area_id",
      "Puesto_id",
      "TipoEntidad_id",
      "FcIngreso",
      "FcBaja",
      "Estado"
    ],
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

export const listarcomponentes = async (req = request, res = response) => {
  const Query3 = await TransitoSalida.findAll({
    raw: true,
    attributes: ["transitosalida_id", "componente_id"],
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

export const listaralbaran = async (req = request, res = response) => {
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
