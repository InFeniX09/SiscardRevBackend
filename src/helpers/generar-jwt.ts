import jwt from 'jsonwebtoken';
import config from '../../config';

interface Payload {
    usuario: string;
}

const generarJWT = (usuario: string = '') => {
    // se genera una promesa manual
    return new Promise((resolve, reject) => {
        const payload: Payload = { usuario };

        jwt.sign(payload, config.TOKEN_KEY, {
            expiresIn: config.TOKEN_EXP
        }, (err, token) => { // callback
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }
            else {
                resolve(token)
            }
        })
    })
}


export default generarJWT;