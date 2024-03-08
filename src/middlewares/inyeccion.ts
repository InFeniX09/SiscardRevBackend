const { response } = require('express');

const validarComillas = (req: any, res = response, next: any) => {
  const values = [...Object.values(req.params), ...Object.values(req.query), ...Object.values(req.body)];
  if (values.toString().includes("'")) {
    return res.status(401).json({
      ok: false,
      msg: 'Caracter no valido'
    });
  }
  // TODO OK!
  next();
}

export  default validarComillas