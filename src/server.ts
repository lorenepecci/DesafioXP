import { app } from './app';
import "dotenv/config";

const { PORT_SERVER } = process.env;
app.listen(PORT_SERVER, ()=> console.log(`Escutando na porta ${PORT_SERVER}`))
