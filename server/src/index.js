// Load environment variables
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

import connectDb from './db/db1.js';
import app from './app.js';
// console.log(process.env, "index");

/**
 * Do not modify any code in this file
 */

connectDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => 
            console.log(`Server listening on http://localhost:${process.env.PORT}`.yellow)
        );
        app.on('error', (err) => {
            console.log(err.message);
            throw err;
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
