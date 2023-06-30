/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

'use Strict';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';
import db from './config/dbConnect.js';
import routes from './routes/index.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require('../swagger/swagger.json');

db.on('error', console.log.bind(console, 'erro de conexão'));
db.once('open', () => console.log('conexao feita com sucesso!'));
console.log('Iniciando ecomm');

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes(app);

export default app;
