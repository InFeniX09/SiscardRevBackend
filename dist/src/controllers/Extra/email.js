"use strict";
const nodemailer = require('nodemailer');
// Configuración del transporte
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Servidor SMTP
    port: 587, // Puerto SMTP (587 para TLS, 465 para SSL, 25 para conexión estándar)
    secure: false, // True para 465, false para otros puertos
    auth: {
        user: 'luis.condori@siscardperu.pe', // Tu dirección de correo electrónico
        pass: 'hfnvttqxbycgsmfd' // Tu contraseña de correo electrónico
    }
});
module.exports = transporter;
