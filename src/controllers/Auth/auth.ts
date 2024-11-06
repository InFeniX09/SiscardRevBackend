import { request, response } from "express";
import Usuario from "../../models/usuario";
import Entidad from "../../models/entidad";
import PerfilUsuario from "../../models/perfilusuario";
import Perfil from "../../models/perfil";
const nodemailer = require("nodemailer");

export const buscarUsuario = async (req = request, res = response) => {

  const { pUsuario, nuevosDatos } = req.body;
  Usuario.belongsTo(Entidad, { foreignKey: "Entidad_id" });
  Usuario.hasMany(PerfilUsuario, { foreignKey: "Usuario_id" });
  PerfilUsuario.belongsTo(Perfil, {foreignKey: "Perfil_id"});
  
  const Query3 = await Usuario.findOne({
    attributes: ["IdUsuario", "Usuario", "Clave", "FcIngreso", "FcBaja"],
    include: [
      {
        model: Entidad,
        attributes: [],
        required: true,
      },
      {
        model: PerfilUsuario,
        attributes: [],
        required: true,
        include:[{
          model:Perfil,
          attributes: ["Area_id"],
        }]
      },
    ],
    where: {
      Estado_id: "1",
      Usuario: pUsuario,
    },
  });


  await Usuario.update(nuevosDatos, {
    where: {
      Usuario: pUsuario,
    },
  });


  if (Query3) {
    try {
      console.log("QUERY 3333333333333",Query3);
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

export const enviarCorreoSocket = async (data: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "infenix.reborn@gmail.com",
      pass: "fzf zrz mhg hyq otrl",
    },
  });

  let mailOptions: any = {
    from: '"SiscardRevolution🎊" <SiscardRevolution@siscardperu.pe>', // sender address
    to: "infenix.reborn@gmail.com", // list of receivers
    cc: "",
    subject: "Pruebas Testing SR ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b> Ya estamos llegandoooooo </b>", // html body
  };
  // Si el archivo adjunto existe, añadirlo a las opciones del correo
  if (data.pdf) {
    mailOptions.attachments = [
      {
        filename: "archivo1.pdf", // Nombre del primer archivo adjunto
        content: data.pdf, // Contenido del primer archivo PDF
        encoding: "base64", // Codificación del contenido
      },
    ];
  }

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
};
export const recuperarClave = async (data: any) => {
  const Query0 = await Usuario.findOne({
    where: { Correo: data.Email },
  });

  const clave = Math.floor(Math.random() * 900000) + 100000;

  if (Query0) {
    const Query1 = await Usuario.update(
      {
        ClaveTemporal: clave,
      },
      {
        where: { Correo: data.Email },
      }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "infenix.reborn@gmail.com",
      pass: "fzf zrz mhg hyq otrl",
    },
  });

  let mailOptions: any = {
    from: '"SiscardRevolution🎊"<SiscardRevolution@siscardperu.pe>', // sender address
    to: data.Email, // list of receivers
    cc: "",
    subject: "Recuperación de Clave✔", // Subject line
    html: `<div>
            <p>
            🚨Se ha solicitado una recuperación de clave, usa el siguiente token para recuperar tu contraseña:
            </p>
            <span>
              <strong>${clave}</strong>
            </span>
            <p>
              si no solicitaste este token, omite este
              mensaje, Gracias!
            </p>
          </div>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
};
export const recuperarClaveToken = async (data: any) => {
  const Query0 = await Usuario.findOne({
    where: { Correo: data.Email, ClaveTemporal: data.Token },
  });
  if (Query0) {
    return "Existe";
  } else {
    return "No existe";
  }
};
export const cambioClave = async (data: any) => {
  const Query1 = await Usuario.update(
    {
      Clave: data.Clave,
    },
    {
      where: { Correo: data.Email },
    }
  );

  if (Query1) {
    return "Existe";
  } else {
    return "No existe";
  }
};
