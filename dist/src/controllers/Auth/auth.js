"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambioClave = exports.recuperarClaveToken = exports.recuperarClave = exports.enviarCorreoSocket = exports.buscarUsuario = void 0;
const express_1 = require("express");
const usuario_1 = __importDefault(require("../../models/usuario"));
const entidad_1 = __importDefault(require("../../models/entidad"));
const perfilusuario_1 = __importDefault(require("../../models/perfilusuario"));
const perfil_1 = __importDefault(require("../../models/perfil"));
const nodemailer = require("nodemailer");
const buscarUsuario = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const { pUsuario, nuevosDatos } = req.body;
    usuario_1.default.belongsTo(entidad_1.default, { foreignKey: "Entidad_id" });
    usuario_1.default.hasMany(perfilusuario_1.default, { foreignKey: "Usuario_id" });
    perfilusuario_1.default.belongsTo(perfil_1.default, { foreignKey: "Perfil_id" });
    const Query3 = yield usuario_1.default.findOne({
        attributes: ["IdUsuario", "Usuario", "Clave", "FcIngreso", "FcBaja"],
        include: [
            {
                model: entidad_1.default,
                attributes: [],
                required: true,
            },
            {
                model: perfilusuario_1.default,
                attributes: [],
                required: true,
                include: [{
                        model: perfil_1.default,
                        attributes: ["Area_id"],
                    }]
            },
        ],
        where: {
            Estado_id: "1",
            Usuario: pUsuario,
        },
    });
    yield usuario_1.default.update(nuevosDatos, {
        where: {
            Usuario: pUsuario,
        },
    });
    if (Query3) {
        try {
            console.log("QUERY 3333333333333", Query3);
            return res.status(200).json({
                ok: true,
                msg: "Informacion Correcta",
                Query3,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg: "Error de conexión",
            });
        }
    }
    else {
        res.status(401).json({
            ok: false,
            msg: "Error de conexión",
        });
    }
});
exports.buscarUsuario = buscarUsuario;
const enviarCorreoSocket = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "infenix.reborn@gmail.com",
            pass: "fzf zrz mhg hyq otrl",
        },
    });
    let mailOptions = {
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
    const info = yield transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
});
exports.enviarCorreoSocket = enviarCorreoSocket;
const recuperarClave = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield usuario_1.default.findOne({
        where: { Correo: data.Email },
    });
    const clave = Math.floor(Math.random() * 900000) + 100000;
    if (Query0) {
        const Query1 = yield usuario_1.default.update({
            ClaveTemporal: clave,
        }, {
            where: { Correo: data.Email },
        });
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
    let mailOptions = {
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
    const info = yield transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
});
exports.recuperarClave = recuperarClave;
const recuperarClaveToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query0 = yield usuario_1.default.findOne({
        where: { Correo: data.Email, ClaveTemporal: data.Token },
    });
    if (Query0) {
        return "Existe";
    }
    else {
        return "No existe";
    }
});
exports.recuperarClaveToken = recuperarClaveToken;
const cambioClave = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Query1 = yield usuario_1.default.update({
        Clave: data.Clave,
    }, {
        where: { Correo: data.Email },
    });
    if (Query1) {
        return "Existe";
    }
    else {
        return "No existe";
    }
});
exports.cambioClave = cambioClave;
