import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/user.model';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql", 
    host: process.env.HOST || "localhost",
    port: 3306,
    username: process.env.USER || "root",
    password: process.env.PASSWORD || "richmongwapo123",
    database: process.env.DATABASE || "node-mysql-crud-api",
    synchronize: true, // Set to false in production!
    logging: false,
    entities: [User],
    migrations: [], 
    subscribers: [],
});