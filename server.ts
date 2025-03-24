import 'reflect-metadata'; // Imported reflect-metadata
import express from 'express';
import { AppDataSource } from './_helpers/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to database first, then start the server
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully.');

        // Define a simple route
        app.get('/', (req, res) => {
            res.send('Server is running...');
        });

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });