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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/Auth/auth");
const chat_1 = require("../controllers/Extra/chat");
const transporter = require("../controllers/Extra/email");
const router = (0, express_1.Router)();
/*SISCARDFORGE*/
router.post("/buscarUsuario", auth_1.buscarUsuario);
router.post("/buscarMenu", chat_1.PostlistarMenuxUsuarioxPerfil);
router.post("/:email/code", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.params;
        const result = yield transporter.sendMail({
            from: "luis.condori@siscardperu.pe",
            to: email,
            subject: "code",
            body: "holaaaa",
        });
        console.log(result);
        res.status(200).json({ ok: true, message: "enviado" });
    });
});
exports.default = router;
