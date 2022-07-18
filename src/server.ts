import 'dotenv/config';
import 'fs';
import swaggerUi from 'swagger-ui-express';
import { app } from './app';

const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { PORT_SERVER } = process.env;
app.listen(PORT_SERVER, () => console.log(`Escutando na porta ${PORT_SERVER}`));
