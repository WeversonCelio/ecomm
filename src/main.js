/* eslint-disable no-console */
/* eslint-disable import/extensions */

'use Strict';

import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';

db.on('error', console.log.bind(console, 'erro de conexão'));
db.once('open', () => console.log('conexao feita com sucesso!'));
console.log('Iniciando ecomm');

const app = express();
app.use(express.json());
routes(app);

export default app;
