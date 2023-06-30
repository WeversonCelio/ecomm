/* eslint-disable no-console */
/* eslint-disable import/extensions */
import app from './src/main.js';

const port = process.env.port || 3000; // port passed in docker
app.listen(port, () => console.log(`servidor escutando em http://localhost:${port}`));
