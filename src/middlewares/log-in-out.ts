import { request, response, NextFunction } from "express";
import _ from "underscore";
import logger from "../helpers/generar-log";

const logInOut = (req = request, res = response, next: NextFunction) => {
    const start = Date.now()
    logger.info(`${req.originalUrl} request headers ${JSON.stringify(req.headers)}`)
    if (!_.isEmpty(req.body))
	    logger.info(`${req.originalUrl} request body ${JSON.stringify(req.body)}`)

	res.on('finish', () => {
        const end = Date.now()
        logger.info(`${req.originalUrl} response ${res.statusCode} (${res.statusMessage}) in ${end-start} ms`)
    })

    next()
}

export default logInOut