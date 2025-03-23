"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    if (typeof err === 'string') {
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        res.status(statusCode).json({ message: err });
    }
    else {
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}