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
exports.releaseConnection = exports.initializeConnection = void 0;
const pg_1 = require("pg");
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({
    encoding: 'utf8',
    path: (0, path_1.resolve)(process.cwd(), '.env'),
});
const poolConfig = {
    host: process_1.env.DB_HOST,
    port: +(process_1.env.DB_PORT || 10033),
    user: process_1.env.DB_USER,
    password: process_1.env.DB_PASSWORD,
    database: process_1.env.DATABASE,
    idleTimeoutMillis: 5000,
    max: 1000,
    connectionTimeoutMillis: 10000,
};
const pool = new pg_1.Pool(poolConfig);
pool.on('error', (err) => {
    console.error(err);
});
const initializeConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`New db connection is established!!`);
    return pool;
});
exports.initializeConnection = initializeConnection;
const releaseConnection = (client) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Connection release is : ${yield client.release(true)}`);
});
exports.releaseConnection = releaseConnection;
