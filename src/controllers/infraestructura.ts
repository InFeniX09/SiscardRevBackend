import { Request, Response, request, response } from "express";
import Menu from "../models/menu";
import Usuario from "../models/usuario";
import Equipo from "../models/equipo";
import Proveedor from "../models/proveedor";
import Marca from "../models/marca";
import Modelo from "../models/modelo";
import TipoEquipo from "../models/tipoequipo";
import Cliente from "../models/cliente";
import EquipoControl from "../models/equipocontrol";
import { Op, Sequelize } from "sequelize";
import EquipoStock from "../models/equipostock";
import EquipoDescuento from "../models/equipodescuento";
import TipoMenu from "../models/tipomenu";
import Color from "../models/color";
import Persona from "../models/persona";
import TipoDocumento from "../models/tipodocumento";
import Area from "../models/area";
import Puesto from "../models/puesto";

export const listarcliente = async (req = request, res = response) => {
  const Query3 = await Cliente.findAll({
    raw: true,
    attributes: ["IdCliente", "Cliente", "Cliente.Estado"],
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

export const listarproveedor = async (req = request, res = response) => {
  const Query3 = await Proveedor.findAll({
    raw: true,
    attributes: ["IdProveedor", "Proveedor", "Proveedor.Estado"],
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

export const listarcolor = async (req = request, res = response) => {
  const Query3 = await Color.findAll({
    raw: true,
    attributes: ["IdColor", "Color", "Codigo", "Estado"],
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
/**/
export const listarusuario = async (req = request, res = response) => {
  const Query3 = await Usuario.findAll({
    raw: true,
    attributes: [
      "IdUsuario",
      "Usuario",
      "Correo",
      "Telefono",
      "FcIngreso",
      "FcBaja",
      "Estado",
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
export const listarpersona = async (req = request, res = response) => {
  Persona.belongsTo(TipoDocumento, { foreignKey: "idTipoDocumento" });
  Persona.belongsTo(Area, { foreignKey: "idArea" });
  Persona.belongsTo(Puesto, { foreignKey: "idPuesto" });

  const Query3 = await Persona.findAll({
    raw: true,
    attributes: [
      "IdPersona",
      "Nombres",
      "Apellidos",
      "TipoDocumento.TipoDocumento",
      "NroDocumento",
      "Correo",
      "Genero",
      "FcNacimiento",
      "Telefono",
      "Area.Area",
      "Puesto.Puesto",
      "Estado",
    ],
    include: [
      {
        model: TipoDocumento,
        attributes: [],
        required: true,
      },
      {
        model: Area,
        attributes: [],
        required: true,
      },
      {
        model: Puesto,
        attributes: [],
        required: true,
      },
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
/**/
export const listarmenu = async (req = request, res = response) => {
  const { pidTipoMenu, pidPadre } = req.query;

  Menu.belongsTo(TipoMenu, { foreignKey: "idTipoMenu" });

  const Query3 = await Menu.findAll({
    attributes: [
      "IdMenu",
      "Menu",
      "Ruta",
      "RutaImagen",
      "Comando",
      "TipoMenu.TipoMenu",
      "idPadre",
      "Estado",
    ],
    include: [
      {
        model: TipoMenu,
        attributes: [],
        required: true,
      },
    ],
    where: {
      Estado: "A",
      idTipoMenu: {
        [Op.like]: pidTipoMenu
          ? Sequelize.literal(`ISNULL('${pidTipoMenu}', '%')`)
          : "%",
      },
      idPadre: {
        [Op.like]: pidPadre
          ? Sequelize.literal(`ISNULL('${pidPadre}', '%')`)
          : "%",
      },
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

export const listartipomenu = async (req = request, res = response) => {
  const Query3 = await TipoMenu.findAll({
    attributes: ["IdTipoMenu", "TipoMenu", "Estado"],
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
/*CREAR*/
export const crearequipo = async (req = request, res = response) => {
  let pMarca = req.body.Marca?.toString();
  let pModelo = req.body.Modelo?.toString();
  let pCliente = req.body.Cliente?.toString();
  let pEspecificacion = req.body.Especificacion?.toString();

  const Query3 = await Equipo.create({
    idMarca: pMarca,
    idModelo: pModelo,
    idCliente: pCliente,
    Especificacion: pEspecificacion,
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

export const crearequipocontrol = async (req = request, res = response) => {
  let Equipo = req.body.idEquipo?.toString();
  let Serie = req.body.Serie?.toString();
  let Identificacion = req.body.Identificacion?.toString();
  let TiempoVida = req.body.TiempoVida?.toString();
  let Proveedor = req.body.idProveedor?.toString();
  let FcIngreso = req.body.FcIngreso;
  let Observacion = req.body.Observacion?.toString();
  let Estado = req.body.Estado?.toString();

  const Query3 = await EquipoControl.create({
    idEquipo: Equipo,
    Serie: Serie,
    Identificacion: Identificacion,
    TiempoVida: TiempoVida,
    idUsuario: "1",
    idProveedor: Proveedor,
    FcIngreso: FcIngreso,
    Observacion: Observacion,
    Estado: Estado,
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

export const crearequipodescuento = async (req = request, res = response) => {
  let resultado = req.body.resultado;

  await EquipoDescuento.bulkCreate(resultado);
  res.status(200).json({ message: "Inserción masiva completada." });
};

export const creartipoequipo = async (req = request, res = response) => {
  let pTipoEquipo = req.body.TipoEquipo?.toString();
  let pClasificacion = req.body.Clasificacion?.toString();

  const Query3 = await TipoEquipo.create({
    TipoEquipo: pTipoEquipo,
    Clasificacion: pClasificacion,
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

export const crearmarca = async (req = request, res = response) => {
  let pTipoEquipo = req.body.TipoEquipo?.toString();
  let pMarca = req.body.Marca?.toString();

  const Query3 = await Marca.create({
    Marca: pMarca,
    idTipoEquipo: pTipoEquipo,
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

export const crearmodelo = async (req = request, res = response) => {
  let pMarca = req.body.Marca?.toString();
  let pModelo = req.body.Modelo?.toString();

  const Query3 = await Modelo.create({
    idMarca: pMarca,
    Modelo: pModelo,
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

export const crearcliente = async (req = request, res = response) => {
  let pcliente = req.body.Cliente?.toString();

  const Query3 = await Cliente.create({
    Cliente: pcliente,
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

export const crearproveedor = async (req = request, res = response) => {
  let pproveedor = req.body.Proveedor?.toString();

  const Query3 = await Proveedor.create({
    Proveedor: pproveedor,
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
