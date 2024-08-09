import express from 'express';
import errorHandler from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.send("Hii there welcom in my backend")
})

app.use(cors({
    origin: ['https://nexadev-consultancy-service.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin',adminRouter)




// for any error I am using this to send the error properly to frontend 
// please add any code above this
app.use(errorHandler);

export default app;
