"use strict";

import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.json';
import mysql from 'mysql2/promise';

interface Config {
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    };
}

const db: { [key: string]: any } = {};
export default db;

initialize();

async function initialize(): Promise<void> {
    const { host, port, user, password, database } = (config as Config).database;
    try {
        const connection = await mysql.createConnection({ host, port, user, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        console.log(`✅ Database '${database}' is ready.`);
    } catch (error) {
        console.error('⚠️ MySQL Connection Error:', error);
        process.exit(1);
    }

    const sequelize = new Sequelize(database, user, password, { host, dialect: 'mysql' });
    db.User = require('../users/user.model').default(sequelize, DataTypes);
    await sequelize.sync({ alter: true });
}