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
const pdfkit_1 = __importDefault(require("pdfkit"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_1 = require("express");
const guia_remision_1 = require("../controllers/Logistica/guia-remision");
const reporte_sga_1 = require("../controllers/Logistica/reporte-sga");
const Reporte_logistica_claro_1 = __importDefault(require("../models/DWH/views/Reporte_logistica_claro"));
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const vw_zonas_1 = __importDefault(require("../models/Poas2000/vw_zonas"));
const componentes_1 = __importDefault(require("../models/Poas2000/componentes"));
const equipos_siscard_1 = __importDefault(require("../models/Poas2000/equipos-siscard"));
const usuario_1 = __importDefault(require("../models/usuario"));
const entidad_1 = __importDefault(require("../models/entidad"));
const express = require("express");
const ExcelJS = require("exceljs");
const router = (0, express_1.Router)();
const transporter = nodemailer_1.default.createTransport({
    host: "mail.siscardperu.pe",
    port: 25,
    secure: false, // NO usar SSL directo en puerto 25
    auth: {
        user: "noreply@siscardperu.pe",
        pass: "S1sc4rdP3ru2019!",
    },
    tls: {
        rejectUnauthorized: false, // ⚠️ Ignora el error del certificado
    },
});
router.get("/listarAlmacenxAlbaranSalida", guia_remision_1.listarAlmacenxAlbaranSalida);
router.get("/listarAlbaranes", guia_remision_1.listarAlbaranes);
router.post("/listarDetalleAlbaranSalida", guia_remision_1.listarDetalleAlbaranSalida);
router.post("/listarDatosPdfAlbaranSalida", guia_remision_1.listarDatosPdfAlbaranSalida);
router.post("/listarAlbaranSalidaxZona", guia_remision_1.listarAlbaranSalidaxZona);
router.get("/descargarReporteSGA", reporte_sga_1.descargarReporteSGA);
router.get("/descargarExcelSGA", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultados = yield Reporte_logistica_claro_1.default.findAll({
            // Puedes agregar filtros si es necesario
            where: {
                Componente_SAP: {
                    [sequelize_1.Op.notIn]: ["1002950", "1053621", "4068259"],
                },
                sDsNIF: {
                    [sequelize_1.Op.not]: [""],
                },
            },
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Reporte");
        worksheet.columns = [
            { header: "CODIGO_SAP", key: "cod_sap", width: 15 },
            { header: "SERIE", key: "serie", width: 10 },
            { header: "CM_MTA_MAC", key: "cm", width: 20 },
            { header: "EMTA_MTA_MAC", key: "emta", width: 10 },
            { header: "UNIT_ADDRESS", key: "unit", width: 15 },
            { header: "DNI", key: "dni", width: 20 },
            { header: "Nombres", key: "nombres", width: 20 },
        ];
        resultados.forEach((resultado) => {
            worksheet.addRow({
                cod_sap: resultado.Componente_SAP,
                serie: resultado.No_Serie,
                cm: resultado.CM_MTA_MAC,
                emta: resultado.EMTA_MTA_MAC,
                unit: resultado.UNIT_ADDRESS,
                dni: resultado.sDsNIF,
                nombres: resultado.sDsZona,
            });
        });
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", 'attachment; filename="datos.xlsx"');
        yield workbook.xlsx.write(res);
        res.end();
    }
    catch (error) {
        res.status(500).send("Error al generar el archivo Excel");
    }
}));
// Ruta para generar el PDF
// Ruta para generar el PDF
router.post("/generar-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pdatos, pdetalle } = req.body;
        // Generar el PDF
        const pdfBytes = yield generarPDF(pdatos, pdetalle);
        // Configurar encabezados de la respuesta
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=archivo.pdf");
        // Enviar el PDF como respuesta
        res.send(pdfBytes);
        console.log("PDF generado y enviado correctamente");
    }
    catch (error) {
        console.error("Error al generar el PDF:", error);
        res.status(500).send("Error interno del servidor");
    }
}));
router.post("/generar-pdf-equipos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pdatos, zona, area, comentario, mes, usuario, estado } = req.body;
        const email = (yield vw_zonas_1.default.findOne({
            raw: true,
            attributes: ["sDsContacto"],
            where: { zona_id: zona },
        }));
        const pdfBytes = yield enviarCorreoConPDFEquipos((email === null || email === void 0 ? void 0 : email.sDsContacto) || "", pdatos, zona, area, comentario, mes, usuario, estado); // pdfBytes es Uint8Array
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=PDF.pdf");
        res.setHeader("Content-Length", pdfBytes.length); // recomendable
        // ⚠️ ENVÍA COMO BUFFER PARA EVITAR DAÑOS
        res.end(Buffer.from(pdfBytes));
    }
    catch (error) {
        console.error("Error al generar el PDF:", error);
        res.status(500).send("Error interno del servidor");
    }
}));
// Función para generar el PDF
function generarPDF(pdatos, pdetalle) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            try {
                const doc = new pdfkit_1.default();
                const buffers = [];
                let currentPage = 1;
                doc.on("data", (buffer) => buffers.push(buffer));
                doc.on("end", () => {
                    const pdfBytes = Buffer.concat(buffers);
                    // Resolvemos la promesa con los bytes del PDF
                    resolve(pdfBytes);
                });
                const datos = pdatos[0];
                const detalle = pdetalle;
                const today = new Date();
                const year = today.getFullYear();
                const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Los meses empiezan desde 0
                const day = today.getDate().toString().padStart(2, "0");
                const formattedDate = `${day}/${month}/${year}`;
                for (let i = 0; i < detalle.length; i++) {
                    const currentDetail = detalle[i];
                    let yPosition = 290 + 15 * i;
                    if (i === 17) {
                        // Si llegamos al límite de la primera página, creamos una nueva página
                        doc.addPage();
                        currentPage = 2; // Actualizamos la página actual
                        doc.fontSize(12).text(formattedDate, 113, 115);
                        doc.fontSize(12).text("AV. Aviación 1564 - La Victoria", 122, 130);
                        doc.fontSize(10).text(datos.sDsDireccion, 125, 148);
                        doc.fontSize(12).text(datos.sDsCliente, 146, 163);
                        doc.fontSize(12).text(datos.sDsNif, 75, 177);
                        doc.fontSize(12).text(datos.sDsZona, 152, 210);
                        doc.fontSize(12).text(datos.sDsNIF, 79, 224);
                        doc.fontSize(12).text("X", 565, 242);
                    }
                    if (i === 0) {
                        doc.fontSize(12).text(formattedDate, 113, 115);
                        doc.fontSize(12).text("AV. Aviación 1564 - La Victoria", 122, 130);
                        doc.fontSize(10).text(datos.sDsDireccion, 125, 148);
                        doc.fontSize(12).text(datos.sDsCliente, 146, 163);
                        doc.fontSize(12).text(datos.sDsNif, 75, 177);
                        doc.fontSize(12).text(datos.sDsZona, 152, 210);
                        doc.fontSize(12).text(datos.sDsNIF, 79, 224);
                        doc.fontSize(12).text("X", 565, 242);
                    }
                    if (currentPage === 1) {
                        // Agregar a la primera página
                        doc.fontSize(12).text(currentDetail.nComponentes, 58, yPosition);
                        doc
                            .fontSize(12)
                            .text(currentDetail.sNmSerie !== ""
                            ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                            : currentDetail.sDsComponente, 98, yPosition);
                    }
                    else {
                        // Agregar a la segunda página
                        yPosition = 15 * i;
                        console.log(yPosition);
                        doc.fontSize(12).text(currentDetail.nComponentes, 58, yPosition);
                        doc
                            .fontSize(12)
                            .text(currentDetail.sNmSerie !== ""
                            ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                            : currentDetail.sDsComponente, 98, yPosition);
                    }
                }
                doc.end();
            }
            catch (error) {
                console.error("Error al generar el PDF:", error);
                reject(error);
            }
        });
    });
}
function enviarCorreoConPDFEquipos(destinatario, pdatos, zona, area, comentario, mes, usuario, estado) {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfBuffer = yield generarPDFEquipos(pdatos, zona, area, comentario, mes, usuario, estado);
        /*try {
          const info = await transporter.sendMail({
            from: `"Area de sistemas" <noreply@siscardperu.pe>`,
            to: destinatario,
            subject: `Informe de equipos entregados`,
            text: "Adjunto encontrarás el PDF con los detalles de los equipos.",
            attachments: [
              {
                filename: "informe_equipos.pdf",
                content: Buffer.from(pdfBuffer),
                contentType: "application/pdf",
              },
            ],
          });
      
          console.log("✅ Correo enviado correctamente:", info.messageId);
        } catch (error) {
          console.error("❌ Error al enviar el correo:", error);
          throw error; // Re-lanzar para que el error sea manejado en el controlador que llama
        }*/
        return pdfBuffer;
    });
}
function generarPDFEquipos(pdatos, zona, area, comentario, mes, usuario, estado) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nombreZona = (yield vw_zonas_1.default.findOne({
                raw: true,
                attributes: ["sDsZona"],
                where: { zona_id: zona },
            }));
            // Obtener todos los nombres de los componentes que vengan en pdatos
            const equiposPropios = yield Promise.all(pdatos.map((item) => equipos_siscard_1.default.findOne({
                raw: true,
                attributes: ["componente_id", "sNmSerie"],
                where: {
                    ubicacion_id: item.almacen_id,
                    componente_id: item.componente_id,
                },
                order: [["dfcUltMovimiento", "DESC"]], // Aquí se aplica el orden
            })));
            const nombresEquipos = yield Promise.all(pdatos.map((item) => componentes_1.default.findOne({
                raw: true,
                attributes: ["componente_id", "sDsComponente", "nUltimoPrecio"],
                where: { componente_id: item.componente_id },
            })));
            const nombrePersonal = (yield usuario_1.default.findOne({
                raw: true,
                attributes: [
                    "Usuario",
                    [sequelize_1.Sequelize.col("EntidadUsuario.Nombres"), "Nombres"],
                    [sequelize_1.Sequelize.col("EntidadUsuario.Apellidos"), "Apellidos"],
                ],
                where: { Usuario: usuario },
                include: [
                    {
                        model: entidad_1.default,
                        as: "EntidadUsuario", // nuevo alias
                        attributes: [],
                    },
                ],
            }));
            return new Promise((resolve, reject) => {
                const doc = new pdfkit_1.default({ size: "A4", margin: 0 });
                const buffers = [];
                doc.on("data", (chunk) => buffers.push(chunk));
                doc.on("end", () => {
                    const pdfBuffer = Buffer.concat(buffers);
                    resolve(Uint8Array.from(pdfBuffer));
                });
                const imagePath = path_1.default.resolve(__dirname, "../../../src/assets/PLANTILLA_CARGO.jpg");
                const imagePathLogo = path_1.default.resolve(__dirname, "../../../src/assets/logoreal.jpg");
                if (fs_1.default.existsSync(imagePath)) {
                    doc.image(imagePath, 0, 0, {
                        width: doc.page.width,
                        height: doc.page.height,
                    });
                }
                else {
                    console.warn("Imagen no encontrada:", imagePath);
                }
                if (fs_1.default.existsSync(imagePathLogo)) {
                    doc.image(imagePathLogo, 480, 10, {
                        width: 100,
                        height: 60,
                    });
                }
                else {
                    console.warn("Imagen no encontrada:", imagePathLogo);
                }
                const today = new Date();
                const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
                // ZONA
                doc.fontSize(10).text((nombreZona === null || nombreZona === void 0 ? void 0 : nombreZona.sDsZona) || "", 70, 145);
                doc.fontSize(10).text((nombreZona === null || nombreZona === void 0 ? void 0 : nombreZona.sDsZona) || "", 120, 700);
                // FECHA Y ÁREA
                doc.fontSize(10).text(area || "", 480, 145);
                doc.fontSize(10).text(formattedDate, 480, 115);
                doc.text(estado.toString(), 480, 205);
                // EQUIPOS (1 o 2 según pdatos)
                pdatos.forEach((item, index) => {
                    var _a, _b, _c, _d, _e;
                    const y = 205 + index * 15;
                    const nombreComponente = ((_a = nombresEquipos[index]) === null || _a === void 0 ? void 0 : _a.sDsComponente) || "";
                    const snmserie = ((_b = equiposPropios[index]) === null || _b === void 0 ? void 0 : _b.sNmSerie) || "";
                    const precio = (_d = (_c = nombresEquipos[index]) === null || _c === void 0 ? void 0 : _c.nUltimoPrecio) !== null && _d !== void 0 ? _d : 0;
                    const componente_id = ((_e = nombresEquipos[index]) === null || _e === void 0 ? void 0 : _e.componente_id) || "";
                    doc.fontSize(10).text(nombreComponente, 140, y);
                    doc.fontSize(10).text(snmserie, 370, y);
                    if (componente_id.toUpperCase().includes("SIS-CEL")) {
                        const descuentoMensual = precio / 18;
                        const startY = y + 100; // posición vertical inicial
                        const rowHeight = 14;
                        const cellWidth = 60;
                        const colMesX = 280;
                        const colValorX = colMesX + cellWidth;
                        // Encabezado de la tabla
                        doc.fontSize(9).text("Mes", colMesX + 5, startY + 3);
                        doc.text("Valor", colValorX + 5, startY + 3);
                        doc.rect(colMesX, startY, cellWidth, rowHeight).stroke();
                        doc.rect(colValorX, startY, cellWidth, rowHeight).stroke();
                        // Filas de la tabla
                        for (let mes = 1; mes <= 18; mes++) {
                            const posY = startY + mes * rowHeight;
                            const valorMes = (precio - descuentoMensual * (mes - 1)).toFixed(2);
                            // Texto
                            doc.text(mes.toString(), colMesX + 5, posY + 3);
                            doc.text(valorMes.toString(), colValorX + 5, posY + 3);
                            // Bordes de la fila
                            doc.rect(colMesX, posY, cellWidth, rowHeight).stroke();
                            doc.rect(colValorX, posY, cellWidth, rowHeight).stroke();
                        }
                    }
                    else if (componente_id.toUpperCase().includes("SIS-LAP")) {
                        const totalMeses = 36;
                        const descuentoMensual = precio / totalMeses;
                        const startY1 = y + 100; // posición vertical inicial
                        const rowHeight = 14;
                        const cellWidth = 50;
                        const col1MesX = 180;
                        const col1ValorX = col1MesX + cellWidth;
                        doc.fontSize(9).text("Mes (1→18)", col1MesX + 2, startY1 + 3);
                        doc.text("Valor", col1ValorX + 2, startY1 + 3);
                        doc.rect(col1MesX, startY1, cellWidth, rowHeight).stroke();
                        doc.rect(col1ValorX, startY1, cellWidth, rowHeight).stroke();
                        for (let mes = 1, i = 0; mes <= 18; mes++, i++) {
                            const posY = startY1 + (i + 1) * rowHeight;
                            const valorMes = (precio - descuentoMensual * (mes - 1)).toFixed(2);
                            doc.text(mes.toString(), col1MesX + 5, posY + 3);
                            doc.text(valorMes, col1ValorX + 5, posY + 3);
                            doc.rect(col1MesX, posY, cellWidth, rowHeight).stroke();
                            doc.rect(col1ValorX, posY, cellWidth, rowHeight).stroke();
                        }
                        const col2MesX = 310;
                        const col2ValorX = col2MesX + cellWidth;
                        doc.fontSize(9).text("Mes (19→36)", col2MesX + 2, startY1 + 3);
                        doc.text("Valor", col2ValorX + 2, startY1 + 3);
                        doc.rect(col2MesX, startY1, cellWidth, rowHeight).stroke();
                        doc.rect(col2ValorX, startY1, cellWidth, rowHeight).stroke();
                        for (let mes = 19, i = 0; mes <= 36; mes++, i++) {
                            const posY = startY1 + (i + 1) * rowHeight;
                            const valorMes = (precio - descuentoMensual * (mes - 1)).toFixed(2);
                            doc.text(mes.toString(), col2MesX + 5, posY + 3);
                            doc.text(valorMes, col2ValorX + 5, posY + 3);
                            doc.rect(col2MesX, posY, cellWidth, rowHeight).stroke();
                            doc.rect(col2ValorX, posY, cellWidth, rowHeight).stroke();
                        }
                    }
                    if (componente_id.toUpperCase().includes("SIS-ADP")) {
                        const precioFormateado = new Intl.NumberFormat("es-PE", {
                            style: "currency",
                            currency: "PEN",
                            minimumFractionDigits: 2,
                        }).format(precio);
                        const textfinal = 'Desc: ' + precioFormateado;
                        doc.text(textfinal, 370, 205);
                    }
                });
                /** en base a pdatos, pdatos es array y el componente_id es el que s eva a evaluar IF SIS-CEL SOLO TABLA DE 18 O SIS-LAP 36, ELSE SOLO PRECIO*/
                // COMENTARIO, MES Y USUARIO
                doc.fontSize(10).text(comentario || "", 140, 247);
                doc.fontSize(10).text(mes || "", 250, 278);
                doc.fontSize(10).text(nombrePersonal.Nombres, 460, 700);
                doc.end();
            });
        }
        catch (error) {
            console.error("Error al generar el PDF:", error);
            throw error;
        }
    });
}
exports.default = router;
