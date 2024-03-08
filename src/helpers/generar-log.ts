import config from "../../config";
import log from "simple-node-logger";

const logger = log.createRollingFileLogger(config.log);

export default logger;