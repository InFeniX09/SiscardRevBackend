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
import { Op, Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
import VW_ZONAS from "../models/Poas2000/vw_zonas";
import componentes from "../models/Poas2000/componentes";
import Stock from "../models/Poas2000/equipos-siscard";
import Usuario from "../models/usuario";
import Entidad from "../models/entidad";
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
          [Op.notIn]: ["1002950", "1053621", "4068259"],
        },
        sDsNIF: {
          [Op.not]: [""],
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

    resultados.forEach((resultado: any) => {
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

router.post("/generar-pdf-equipos", async (req, res) => {
  try {
    const { pdatos, zona, area, comentario, mes, usuario, estado } = req.body;

    const pdfBytes = await generarPDFEquipos(
      pdatos,
      zona,
      area,
      comentario,
      mes,
      usuario, 
      estado
    ); // pdfBytes es Uint8Array

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=archivo.pdf");
    res.setHeader("Content-Length", pdfBytes.length); // recomendable

    // ⚠️ ENVÍA COMO BUFFER PARA EVITAR DAÑOS
    res.end(Buffer.from(pdfBytes));
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

async function generarPDFEquipos(
  pdatos: any[],
  zona: any,
  area: any,
  comentario: any,
  mes: any,
  usuario: any,
  estado: any
): Promise<Uint8Array> {
  try {
    const nombreZona = (await VW_ZONAS.findOne({
      raw: true,
      attributes: ["sDsZona"],
      where: { zona_id: zona },
    })) as { sDsZona: string } | null;

    // Obtener todos los nombres de los componentes que vengan en pdatos
    const equiposPropios = await Promise.all(
      pdatos.map(
        (item) =>
          Stock.findOne({
            raw: true,
            attributes: ["componente_id", "sNmSerie"],
            where: {
              ubicacion_id: item.almacen_id,
              componente_id: item.componente_id,
            },
          }) as Promise<{
            componente_id: string;
            sNmSerie: string;
          } | null>
      )
    );

    const nombresEquipos = await Promise.all(
      pdatos.map(
        (item) =>
          componentes.findOne({
            raw: true,
            attributes: ["componente_id", "sDsComponente", "nUltimoPrecio"],
            where: { componente_id: item.componente_id },
          }) as Promise<{
            componente_id: string;
            sDsComponente: string;
            nUltimoPrecio: number;
          } | null>
      )
    );

    Usuario.belongsTo(Entidad, {
      foreignKey: "Entidad_id",
      as: "EntidadUsuario",
    });

    const nombrePersonal = (await Usuario.findOne({
      raw: true,
      attributes: [
        "Usuario",
        [Sequelize.col("EntidadUsuario.Nombres"), "Nombres"],
        [Sequelize.col("EntidadUsuario.Apellidos"), "Apellidos"],
      ],
      where: { Usuario: usuario },
      include: [
        {
          model: Entidad,
          as: "EntidadUsuario", // nuevo alias
          attributes: [],
        },
      ],
    })) as unknown as {
      Usuario: string;
      Nombres: string;
      Apellidos: string;
    };

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 0 });
      const buffers: Uint8Array[] = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(Uint8Array.from(pdfBuffer));
      });

      const imagePath = path.resolve(
        __dirname,
        "../../../src/assets/PLANTILLA_CARGO.jpg"
      );

      if (fs.existsSync(imagePath)) {
        doc.image(imagePath, 0, 0, {
          width: doc.page.width,
          height: doc.page.height,
        });
      } else {
        console.warn("Imagen no encontrada:", imagePath);
      }

      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        "0"
      )}/${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}/${today.getFullYear()}`;

      // ZONA
      doc.fontSize(10).text(nombreZona?.sDsZona || "", 70, 145);
      doc.fontSize(10).text(nombreZona?.sDsZona || "", 120, 700);

      // FECHA Y ÁREA
      doc.fontSize(10).text(area || "", 480, 145);
      doc.fontSize(10).text(formattedDate, 480, 115);
      doc.text(estado.toString(), 480,205 );


      // EQUIPOS (1 o 2 según pdatos)
      pdatos.forEach((item, index) => {
        const y = 205 + index * 15;
        const nombreComponente = nombresEquipos[index]?.sDsComponente || "";
        const snmserie = equiposPropios[index]?.sNmSerie || "";

        const precio = nombresEquipos[index]?.nUltimoPrecio ?? 0;
        const componente_id = nombresEquipos[index]?.componente_id || "";

        doc.fontSize(10).text(nombreComponente, 140, y);
        doc.fontSize(10).text(snmserie, 300, y);
        

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
        } else if (componente_id.toUpperCase().includes("SIS-LAP")) {

          
          const totalMeses = 36;
          const descuentoMensual = precio / totalMeses;
          const startY1 = y + 100; // posición vertical inicial
          const rowHeight = 14;
          const cellWidth = 50;

          // Tabla 1: 36→18
          const col1MesX = 180;
          const col1ValorX = col1MesX + cellWidth;

          doc.fontSize(9).text("Mes (36→18)", col1MesX + 2, startY1 + 3);
          doc.text("Valor", col1ValorX + 2, startY1 + 3);
          doc.rect(col1MesX, startY1, cellWidth, rowHeight).stroke();
          doc.rect(col1ValorX, startY1, cellWidth, rowHeight).stroke();

          for (let mes = 36, i = 0; mes >= 18; mes--, i++) {
            const posY = startY1 + (i + 1) * rowHeight;
            const valorMes = (precio - descuentoMensual * (mes - 1)).toFixed(2);

            doc.text(mes.toString(), col1MesX + 5, posY + 3);
            doc.text(valorMes, col1ValorX + 5, posY + 3);

            doc.rect(col1MesX, posY, cellWidth, rowHeight).stroke();
            doc.rect(col1ValorX, posY, cellWidth, rowHeight).stroke();
          }

          // Tabla 2: 18→1
          const col2MesX = 310;
          const col2ValorX = col2MesX + cellWidth;

          doc.fontSize(9).text("Mes (18→1)", col2MesX + 2, startY1 + 3);
          doc.text("Valor", col2ValorX + 2, startY1 + 3);
          doc.rect(col2MesX, startY1, cellWidth, rowHeight).stroke();
          doc.rect(col2ValorX, startY1, cellWidth, rowHeight).stroke();

          for (let mes = 18, i = 0; mes >= 1; mes--, i++) {
            const posY = startY1 + (i + 1) * rowHeight;
            const valorMes = (precio - descuentoMensual * (mes - 1)).toFixed(2);

            doc.text(mes.toString(), col2MesX + 5, posY + 3);
            doc.text(valorMes, col2ValorX + 5, posY + 3);

            doc.rect(col2MesX, posY, cellWidth, rowHeight).stroke();
            doc.rect(col2ValorX, posY, cellWidth, rowHeight).stroke();
          }
        }
      });

      /** en base a pdatos, pdatos es array y el componente_id es el que s eva a evaluar IF SIS-CEL SOLO TABLA DE 18 O SIS-LAP 36, ELSE SOLO PRECIO*/

      // COMENTARIO, MES Y USUARIO
      doc.fontSize(10).text(comentario || "", 140, 247);
      doc.fontSize(10).text(mes || "", 250, 278);

      doc.fontSize(10).text(nombrePersonal.Nombres, 460, 700);

      doc.end();
    });
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    throw error;
  }
}

export default router;
