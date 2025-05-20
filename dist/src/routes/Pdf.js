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
const express_1 = require("express");
const pdfkit_1 = __importDefault(require("pdfkit"));
const stream_1 = require("stream");
const equipo_1 = __importDefault(require("../models/equipo"));
const modelo_1 = __importDefault(require("../models/modelo"));
const marca_1 = __importDefault(require("../models/marca"));
const equipodescuento_1 = __importDefault(require("../models/equipodescuento"));
const router = (0, express_1.Router)();
const mapEquipoResponse = (response) => {
    return {
        id_equipo: response.id_equipo,
        id_modelo: response.id_modelo,
        equipo_imei: response.equipo_imei,
        modelo: response["Modelo.Modelo"],
        marca: response["Marca.Marca"],
    };
};
router.get("/generar-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, dni, rol, smartphone, chip, laptop } = req.query;
    if (smartphone || chip) {
        try {
            equipo_1.default.belongsTo(modelo_1.default, { foreignKey: "id_modelo" });
            equipo_1.default.belongsTo(marca_1.default, { foreignKey: "id_marca" });
            const equipo = yield equipo_1.default.findOne({
                raw: true,
                attributes: ["id_equipo", "equipo_imei", "id_modelo"],
                include: [
                    {
                        model: modelo_1.default,
                        attributes: ["Modelo"],
                        required: true,
                    },
                    {
                        model: marca_1.default,
                        attributes: ["Marca"],
                    },
                ],
                where: {
                    id_equipo: smartphone,
                },
            });
            const dataFinal = mapEquipoResponse(equipo);
            // Realiza la consulta a la base de datos
            const query3 = (yield equipodescuento_1.default.findAll({
                raw: true,
                attributes: ["Tiempo", "Precio"],
                where: {
                    Modelo_id: dataFinal.id_modelo,
                },
                order: [["Tiempo", "ASC"]],
            }));
            // Create a new PDF document
            const doc = new pdfkit_1.default();
            // Pipe the PDF into a PassThrough stream
            const pass = new stream_1.PassThrough();
            doc.pipe(pass);
            // Define the page size
            const pageWidth = 600;
            // Set font size and text
            const text = "HOJA DE CARGO";
            const fontSize = 20;
            doc.fontSize(fontSize);
            // Calculate text width
            const textWidth = doc.widthOfString(text);
            // Calculate position for centering the text
            const xPosition = (pageWidth - textWidth) / 2;
            const yPosition = 50; // Position from top of the page
            // Add the centered text
            var now = new Date();
            doc.text(text, xPosition, yPosition);
            doc.fontSize(12);
            doc.text(`Fecha: ${now.toLocaleDateString()}`, 425, 75);
            doc.text(`Yo: ${nombre}`, 50, 100);
            doc.text(`Area: ${dni}`, 425, 100);
            doc.text("Recibo: ", 50, 125);
            doc.text(`SMARTPHONE: ${dataFinal.marca} - ${dataFinal.modelo} - ${dataFinal.equipo_imei}`, 75, 150);
            doc.text(`TARJETA SIM: ${chip}`, 75, 175); // Ajusta la posición Y si es necesario
            doc.text("COSTOS A PARTIR DEL: ciclo de vida ", 50, 200);
            // Display the query3 data in the PDF
            doc.text("Tiempo - Precio", 50, 240);
            let currentY = 255; // Start position for the data
            query3.forEach((item) => {
                doc.text(`${item.Tiempo} - ${item.Precio}`, 50, currentY);
                currentY += 15; // Adjust the space between rows
            });
            doc.text(`Recibido por: ${nombre}`, 50, currentY + 100);
            doc.text("Henry Valentin ", 400, currentY + 100);
            const textWidthv2 = doc.widthOfString("Siscard Peru");
            const xPositionv2 = (pageWidth - textWidthv2) / 2;
            doc.text("Siscard Peru", xPositionv2, currentY + 150);
            doc.text("AV. AVIACION 1564 LA VICTORIA", xPosition, currentY + 165);
            doc.text("Telefono: 6168700 www.siscard.com", xPosition, currentY + 180);
            if (laptop) {
                doc.addPage();
                //pdf de laptop
            }
            doc.end();
            // Collect the PDF bytes from the PassThrough stream
            const pdfBytes = yield new Promise((resolve, reject) => {
                const chunks = [];
                pass.on("data", (chunk) => chunks.push(chunk));
                pass.on("end", () => resolve(Buffer.concat(chunks)));
                pass.on("error", reject);
            });
            // Set response headers
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", 'attachment; filename="archivo.pdf"');
            // Send the PDF bytes as a response
            res.send(pdfBytes);
        }
        catch (error) {
            console.error("Error generando el PDF:", error);
            res.status(500).send("Error generando el PDF");
        }
    }
    else if (laptop) {
        console.log(laptop);
    }
}));
exports.default = router;
