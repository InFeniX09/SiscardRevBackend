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

    const { pdatos } = req.body;


    // Generar el PDF
    const pdfBytes = await generarPDF(pdatos);

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
async function generarPDF(pdatos:any) {
  return new Promise<Uint8Array>((resolve, reject) => {
    try {
      // Crear un nuevo documento PDF con pdfkit
      const doc = new PDFDocument();

      // Iniciar el stream de escritura del PDF
      const buffers: Uint8Array[] = [];
      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => {
        const pdfBytes = Buffer.concat(buffers);
        // Resolvemos la promesa con los bytes del PDF
        resolve(pdfBytes);
      });

      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Los meses empiezan desde 0
      const day = today.getDate().toString().padStart(2, "0");
      const datos = pdatos[0];

      // Formatea la fecha según tus necesidades
      const formattedDate = `${day}/${month}/${year}`;

      // Agregar contenido al PDF  IZQUIERDA ARRIBA
      doc.fontSize(12).text(formattedDate, 110, 70);
      doc.fontSize(12).text("AV. Aviación 1564 - La Victoria", 119, 85);
      doc.fontSize(10).text(datos.sDsDireccion, 122, 105);
      doc.fontSize(12).text(datos.sDsCliente, 143, 120);
      doc.fontSize(12).text(datos.sDsNif, 72, 135);

      doc.fontSize(12).text(datos.sDsZona, 151, 170);
      doc.fontSize(12).text(datos.sDsNIF, 76, 185);


      doc.fontSize(12).text("Componente seria - 1000", 95, 255);
      doc.fontSize(12).text("Componente nuevo - 1000", 95, 270);
      doc.fontSize(12).text("Componente hdmi - 1000", 95, 285);
      doc.fontSize(12).text("12", 55, 255); 
      doc.fontSize(12).text("21", 55, 270);
      doc.fontSize(12).text("2", 55, 285);


      doc.fontSize(12).text("X", 587, 202);

      // Finalizar el documento y cerrar el stream de escritura
      doc.end();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      reject(error);
    }
  });
}
export default router;
