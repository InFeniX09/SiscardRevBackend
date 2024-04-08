import PDFDocument from "pdfkit";
import fs from "fs";
import { Router } from "express";
import {
  listarAlbaranSalidaxZona,
  listarAlbaranes,
  listarAlmacenxAlbaranSalida,
  listarDatosPdfAlbaranSalida,
  listarDetalleAlbaranSalida,
} from "../controllers/Logistica/guia-remision";
const router = Router();
router.get("/listarAlmacenxAlbaranSalida", listarAlmacenxAlbaranSalida);
router.get("/listarAlbaranes", listarAlbaranes);
router.post("/listarDetalleAlbaranSalida", listarDetalleAlbaranSalida);
router.post("/listarDatosPdfAlbaranSalida", listarDatosPdfAlbaranSalida);
router.post("/listarAlbaranSalidaxZona", listarAlbaranSalidaxZona);
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
        let yPosition = 255 + 15 * i;

        if (i === 17) {
          // Si llegamos al límite de la primera página, creamos una nueva página
          doc.addPage();
          currentPage = 2; // Actualizamos la página actual
          doc.fontSize(12).text(formattedDate, 110, 70);
          doc.fontSize(12).text("AV. Aviación 1564 - La Victoria", 119, 85);
          doc.fontSize(10).text(datos.sDsDireccion, 122, 105);
          doc.fontSize(12).text(datos.sDsCliente, 143, 120);
          doc.fontSize(12).text(datos.sDsNif, 72, 135);
          doc.fontSize(12).text(datos.sDsZona, 151, 170);
          doc.fontSize(12).text(datos.sDsNIF, 76, 185);
          doc.fontSize(12).text("X", 587, 202);
        }
        if (i === 0) {
          doc.fontSize(12).text(formattedDate, 110, 70);
          doc.fontSize(12).text("AV. Aviación 1564 - La Victoria", 119, 85);
          doc.fontSize(10).text(datos.sDsDireccion, 122, 105);
          doc.fontSize(12).text(datos.sDsCliente, 143, 120);
          doc.fontSize(12).text(datos.sDsNif, 72, 135);
          doc.fontSize(12).text(datos.sDsZona, 151, 170);
          doc.fontSize(12).text(datos.sDsNIF, 76, 185);
          doc.fontSize(12).text("X", 587, 202);
        }

        if (currentPage === 1) {
          // Agregar a la primera página
          doc.fontSize(12).text(currentDetail.nComponentes, 55, yPosition);
          doc
            .fontSize(12)
            .text(
              currentDetail.sNmSerie !== ""
                ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                : currentDetail.sDsComponente,
              95,
              yPosition
            );
        } else {
          // Agregar a la segunda página
          yPosition = 15 * i;
          console.log(yPosition);
          doc.fontSize(12).text(currentDetail.nComponentes, 55, yPosition);
          doc
            .fontSize(12)
            .text(
              currentDetail.sNmSerie !== ""
                ? `${currentDetail.sDsComponente} | ${currentDetail.sNmSerie}`
                : currentDetail.sDsComponente,
              95,
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
