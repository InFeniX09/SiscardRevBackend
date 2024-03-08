import { response, NextFunction, request } from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';

const validarJWT = async (req = request, res = response, next: NextFunction) => {
    
    const token = req.header('x-token');

    if( !token ) {
      return res.status(401).json({
        ok: false,
        msg: 'Token no válido'
      })
    }

    try{
        const userBody = jwt.verify(token, config.TOKEN_KEY);
        next();

    } catch (err) {
        console.log(err)
        return res.status(401).json({ // 401 = Unauthorized
            ok: false,
            msg: 'Token no válido'
        })
    }
}

export default validarJWT

