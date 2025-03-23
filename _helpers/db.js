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
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../config.json"));
const promise_1 = __importDefault(require("mysql2/promise"));
const db = {};
exports.default = db;
initialize();
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        const { host, port, user, password, database } = config_json_1.default.database;
        try {
            const connection = yield promise_1.default.createConnection({ host, port, user, password });
            yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
            console.log(`✅ Database '${database}' is ready.`);
        }
        catch (error) {
            console.error('⚠️ MySQL Connection Error:', error);
            process.exit(1);
        }
        const sequelize = new sequelize_1.Sequelize(database, user, password, { host, dialect: 'mysql' });
        db.User = require('../users/user.model').default(sequelize, sequelize_1.DataTypes);
        yield sequelize.sync({ alter: true });
    });
}