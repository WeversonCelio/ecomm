'use Strict';

import express from 'express';

console.log('Iniciando ecomm');
const { PORT } = process.env; // port passed in docker

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Ecomm: Em breve!!!');
  console.log(`'Running in port ${PORT}`);
});

app.listen(PORT);
