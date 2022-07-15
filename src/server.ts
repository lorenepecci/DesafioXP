import express from 'express';
import "dotenv/config";

const app = express();
const { PORT_SERVER } = process.env;
app.listen(PORT_SERVER, ()=> console.log(`Escutando na porta ${PORT_SERVER}`))
