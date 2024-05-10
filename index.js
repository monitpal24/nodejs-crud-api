import express from 'express';
import dotenv from 'dotenv'
import router from './routes.js';
import { connectDB } from './db.js';
dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use('/api', router)
app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running at port ${process.env.PORT}`)
})
