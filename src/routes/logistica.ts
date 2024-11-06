import PDFDocument from "pdfkit";
import { Router } from "express";
import {
  listarAlbaranSalidaxZona,
  listarAlbaranes,
  listarAlmacenxAlbaranSalida,
  listarDatosPdfAlbaranSalida,
  listarDetalleAlbaranSalida,
} from "../controllers/Logistica/guia-remision";
import { descargarReporteSGA } from "../controllers/Logistica/reporte-sga";
import VW_CONSULTA379_Test from "../models/DWH/views/VW_CONSULTA379_Test";
import Reporte_logistica_claro from "../models/DWH/views/Reporte_logistica_claro";
import { Op } from "sequelize";
const express = require("express");
const ExcelJS = require("exceljs");
const router = Router();

router.get("/listarAlmacenxAlbaranSalida", listarAlmacenxAlbaranSalida);
router.get("/listarAlbaranes", listarAlbaranes);
router.post("/listarDetalleAlbaranSalida", listarDetalleAlbaranSalida);
router.post("/listarDatosPdfAlbaranSalida", listarDatosPdfAlbaranSalida);
router.post("/listarAlbaranSalidaxZona", listarAlbaranSalidaxZona);

router.get("/descargarReporteSGA", descargarReporteSGA);
router.get("/descargarExcelSGA", async (req, res) => {
  try {
    const resultados = await Reporte_logistica_claro.findAll({
      // Puedes agregar filtros si es necesario
      where: {
        Componente_SAP: {
          [Op.notIn]: ["1002950", "1053621", "4068259"]
        },
      }
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

    resultados.forEach((resultado : any) => {
      worksheet.addRow({
        cod_sap: resultado.Componente_SAP,
        serie: resultado.No_Serie,
        cm: resultado.CM_MTA_MAC,
        emta: resultado.EMTA_MTA_MAC,
        unit: resultado.UNIT_ADDRESS,
        dni: resultado.sDsNIF,
        nombres: resultado.sDsZona
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="datos.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).send("Error al generar el archivo Excel");
  }
});

// Ruta para generar el PDF
// Ruta para generar el PDF
router.post("/generar-pdf", async (req, res) => {
  try {
    const { pdatos, pdetalle } = req.body;
    // Generar el PDF
    const pdfBytes = await generarPDF(pdatos, pdetalle);

    // Configurar encabezados de la respuesta
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=archivo.pdf");

    // Enviar el PDF como respuesta
    res.send(pdfBytes);
    console.log("PDF generado y enviado correctamente");
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Función para generar el PDF
async function generarPDF(pdatos: any, pdetalle: any) {
  return new Promise<Uint8Array>((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers: Uint8Array[] = [];
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
            .text(
              currentDetail.sNmSerie !== ""
                ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                : currentDetail.sDsComponente,
              98,
              yPosition
            );
        } else {
          // Agregar a la segunda página
          yPosition = 15 * i;
          console.log(yPosition);
          doc.fontSize(12).text(currentDetail.nComponentes, 58, yPosition);
          doc
            .fontSize(12)
            .text(
              currentDetail.sNmSerie !== ""
                ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                : currentDetail.sDsComponente,
              98,
              yPosition
            );
        }
      }

      doc.end();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      reject(error);
    }
  });
}
export default router;
