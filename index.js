import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppRouter from './src/routes/index.js' 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
app.use(AppRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App listening port ${PORT}`))