import express from 'express';
import cors from 'cors';
import { CommonMiddleware } from './src/middleware/common';
import { app } from './src/config/applicationconfig';
import { dbConfig } from './src/config/dbconfig';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const corsOptions = {
//     origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
//         const whitelist = ['http://localhost:3000', 'https://myapp.com'];
//         if (!origin || whitelist.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     Credentials: true,
//     Headers: {
//         'Content-Type': 'application/json', 
//     }
// };
dbConfig();
// app.use(cors(corsOptions));
CommonMiddleware();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})