import express from 'express';
import "dotenv/config";

const app = express();
const { PORT } = process.env;
app.listen(PORT, ()=> console.log(`Escutando na porta ${PORT}`))
