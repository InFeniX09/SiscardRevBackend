import { Router } from "express";
import { buscarUsuario } from "../controllers/Auth/auth";
import { PostlistarMenuxUsuarioxPerfil } from "../controllers/Extra/chat";

const transporter = require("../controllers/Extra/email");
const router = Router();
/*SISCARDFORGE*/

router.post("/buscarUsuario", buscarUsuario);
router.post("/buscarMenu", PostlistarMenuxUsuarioxPerfil);
router.post("/:email/code", async function (req, res) {
  const { email } = req.params;
  const result = await transporter.sendMail({
    from: "luis.condori@siscardperu.pe",
    to: email,
    subject: "code",
    body: "holaaaa",
  });
  console.log(result)
  res.status(200).json({ok:true, message: "enviado"})
});

export default router;
