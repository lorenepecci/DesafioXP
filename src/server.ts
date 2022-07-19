import 'dotenv/config';
import 'fs';
import swaggerUi from 'swagger-ui-express';
import { app } from './app';

const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
