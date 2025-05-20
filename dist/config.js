"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const env = ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toString()) || 'test'; // dev, test o prod
const port = {
    dev: 5500,
    test: 5500,
    prod: 6500
};
const server = {
    dev: '192.168.10.122',
    test: '192.168.10.122',
    prod: '192.168.10.121'
};
const timeout = {
    dev: 60000,
    test: 60000,
    prod: 15000
};
const config = {
    port: port[env],
    TOKEN_KEY: process.env.TOKEN_KEY || 's3cr3t0rpr1v4t3k3y',
    TOKEN_EXP: process.env.TOKEN_EXP || '1200s',
    log: {
        logDirectory: __dirname + '/src/logs',
        fileNamePattern: 'all-<DATE>.log',
        dateFormat: 'YYYY.MM.DD'
    },
    db: {
        Vulcano: {
            user: 'sa',
            password: 'Infenix09',
            server: 'localhost',
            database: 'SiscardForge',
            options: {
                enableArithAbort: true,
                encrypt: false,
                language: "Español",
                dateFormat: "dmy",
                requestTimeout: 180000,
                acquire: 3000000,
            },
            pool: {
                max: 1000,
                min: 1,
                idleTimeoutMillis: 300000000,
                acquireTimeoutMillis: 300000000,
                createTimeoutMillis: 300000000,
                destroyTimeoutMillis: 300000000,
                reapIntervalMillis: 300000000,
                createRetryIntervalMillis: 300000000,
            },
        },
    },
};
exports.default = config;
